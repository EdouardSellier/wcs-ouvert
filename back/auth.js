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
          html: `<p>Madame, Monsieur,</p><p>Votre demande d’inscription a bien été prise en compte. Notre équipe va vous contacter par téléphone et vous enverra la facture correspondant à l’offre sélectionnée dans les meilleurs délais. Une fois la facture réglée, l’accès à l’ensemble des fonctionnalités de notre outil vous sera donné.</p><p>Nous vous remercions de bien vouloir y répondre, cela ne prendra que quelques minutes.</p><p>Pour rappel, le coût d'utilisation de Mouv'R est le suivant :</p><ul><li>De 0 à 500 salariés : 500 € HT / an</li><li>De 500 à 1 000 salariés : 800 € HT / an</li><li>De 1 000 à 2 000 salariés : 1 000 € HT / an</li><li>Au-delà de 2 000 salariés: sur devis</li></ul><p>Bonne journée et à bientôt</p><p>Cordialement,</p><p>Edouard Sellier, chargé de mission mobilité au sein du bureau d’écolonomie OUVERT</p>`
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
