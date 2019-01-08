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
      const token = jwt.sign(user, jwtSecret);
      return res.status(200).json({ user, token });
    });
    return undefined;
  })(req, res);
});
