const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { jwtSecret, dbHandle, saltRounds } = require('./conf');

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
      // generate a signed Json Web Token with the contents of user object and return it in the response
      const token = jwt.sign(user, jwtSecret);
      return res.status(200).json({ user, token });
    });
    return undefined;
  })(req, res);
});

router.post('/inscription', (req, res) => {
  const formData = req.body;
  console.log(formData);
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    formData.password = hash;
    dbHandle.query(`INSERT INTO user SET ?`, formData, (errorRequest, results) => {
      if (errorRequest) {
        return res.status(500).send(`We crashed, here is the message : ${errorRequest}`);
      }
      return res.status(201).send(`Signup successful`);
    });
  });
});

module.exports = router;
