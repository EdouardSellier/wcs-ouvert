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
        `SELECT id, mail, is_admin, has_paid FROM user WHERE mail=${mysql.escape(mail)} LIMIT 1`,
        (err, results) => {
          if (err) {
            return callback(null, false, { message: `We crashed, here is the message: ${err}` });
          }
          const user = results[0];
          if (user) {
            bcrypt.compare(password, user.password, (errBcrypt, result) => {
              if (result === true) {
                return callback(
                  null,
                  {
                    id: user.id,
                    username: user.mail,
                    admin: user.is_admin,
                    has_paid: user.has_paid
                  },
                  { message: 'Logged In Successfully' }
                );
              }
              return callback(null, false, {
                message: 'Incorrect username or password.'
              });
            });
          }
          return undefined;
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    },
    (jwtPayload, cb) => {
      const user = jwtPayload;
      return cb(null, user);
    }
  )
);
