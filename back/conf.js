const mysql = require('mysql');
const jwtSecret = process.env.DB_JWTSECRET;

const dbHandle = mysql.createConnection(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${
    process.env.DB_DATABASE
  }`
);
dbHandle.connect(err => {
  if (err) throw err;
});

const userTransporter = {
  user: process.env.DBTRANSPORTER_USER,
  pass: process.env.DBTRANSPORTER_PASSWORD
};

const authTransporter = {
  auth: {
    api_key: '509a3813f869c27410c2f0603fdc51de-2d27312c-ce3cf0fa',
    domain: 'sandbox1d4fa01e7f12481abec8665884e7c3ac.mailgun.org'
  }
};

const apiKey = {
  key: process.env.DB_APIKEY
};

const saltRounds = 10;
const portServer = process.env.DB_PORTSERVER;

module.exports = {
  userTransporter,
  authTransporter,
  jwtSecret,
  dbHandle,
  saltRounds,
  portServer,
  apiKey
};
