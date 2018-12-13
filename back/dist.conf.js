const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "user", // mySQL username
  password: "password", // mySQL password
  database: "database" // database name
});

const userTransporter = {
  user: "user", // e-mail address
  pass: "pass" // e-mail password
};

module.exports = { connection, userTransporter };
