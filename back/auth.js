const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { jwtSecret, dbHandle, saltRounds, userTransporter } = require('./conf');

const router = express.Router();

router.post('/connexion', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user
      });
    }
    req.login(user, { session: false }, loginErr => {
      if (loginErr) {
        res.send(loginErr);
      }
      const token = jwt.sign(user, jwtSecret);
      return res.status(200).json({ user, token });
    });
    return undefined;
  })(req, res);
});

router.post('/inscription', (req, res) => {
  const formData = req.body;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(formData.password, salt, (err, hash) => {
      formData.password = hash;
      dbHandle.query(`INSERT INTO user SET ?`, formData, (errorRequest, results) => {
        if (errorRequest) {
          return res.status(500).send(`We crashed, here is the message : ${errorRequest}`);
        }
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          secure: false,
          auth: {
            user: userTransporter.user,
            pass: userTransporter.pass
          }
        });
        let mailOptions = {
          from: '"MOUV-R" <no-reply@mouv-r.com>',
          to: req.body.mail,
          subject: "Confirmation d'inscription ✔",
          html: `<p>Madame, Monsieur,</p><p>Votre demande d’inscription a bien été prise en compte. Notre équipe va
          prendre contact avec vous dans les plus brefs délais pour vous présenter le tarif
          de notre outil MOUV’R et valider votre accès.</p><p>Bonne journée et à bientôt</p><p>Cordialement,</p><p>Edouard Sellier, chargé de mission mobilité au sein du bureau d’écolonomie OUVERT</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(500).send('An error occured during mail sending.');
          }
          return res.status(201).send(`Signup successful`);
        });
      });
    });
  });
});

module.exports = router;
