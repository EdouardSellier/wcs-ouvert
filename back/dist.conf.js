const mysql = require('mysql');
const jwtSecret = 'secret key';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user', // mySQL username
  password: 'password', // mySQL password
  database: 'database' // database name
});

const userTransporter = {
  user: 'user', // e-mail address for NodeMailer
  pass: 'pass' // e-mail password for NodeMailer
};

const saltRounds = 10;
const portServer = 8080;
module.exports = { userTransporter, jwtSecret, dbHandle, saltRounds, portServer };
