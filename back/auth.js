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