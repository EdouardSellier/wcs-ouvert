const mysql = require('mysql');
const jwtSecret = process.end.DB_JWTSECRET;

const dbHandle = mysql.createConnection(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${
    process.env.DB_DATABASE
  }`
);
dbHandle.connect(err => {
  if (err) throw err;
});

const userTransporter = {
  user: process.end.DBTRANSPORTER_USER,
  pass: process.end.DBTRANSPORTER_PASSWORD
};

const apiKey = {
  key: process.end.DB_APIKEY
};

const saltRounds = process.end.DB_SALTROUND;
const portServer = process.end.DB_PORTSERVER;
module.exports = { userTransporter, jwtSecret, dbHandle, saltRounds, portServer, apiKey };
