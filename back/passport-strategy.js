const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = require('passport-jwt');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { jwtSecret, dbHandle } = require('./conf');


passport.use(
    new LocalStrategy(
      {
        usernameField: 'mail',
        passwordField: 'password'
      },
      (mail, password, callback) => {
        dbHandle.query(
          `SELECT id, mail, password, lastname, firstname, is_admin, company_name, siret, company_address, phone_number FROM user WHERE mail=${mysql.escape(mail)} LIMIT 1`,
          (err, results) => {
              if (err) {
                  return callback(null, false,{ message: `We crashed, here is the message: ${err}`});
              }
          }