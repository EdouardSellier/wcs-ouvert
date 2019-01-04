const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const { portServer } = require("./conf");
require("./passport-strategy");

const app = express();

// ---------------------------------------------------------------- MIDDLEWARES

// enable the reading of 'req.body'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.post("/inscription", (req, res) => {
  if (req.body) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      req.body.password = hash;
      const formData = req.body;
      connection.query("INSERT INTO user SET ?", formData, (err, results) => {
        if (err) {
          res.status(500).send("The database crashed ! The reason is " + err);
        } else {
          res.status(201).send("SUCCESS");
        }
      });
    });
  } else {
    res.status(403).send("You must provide all informations !");
  }
});

// -------------------------------------------------------- AUTHENTICATION WALL
// Each and every request passing here will be stopped (401 Unauthorized) if it doesn't come with proper JWT
app.all(
  "/*",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    next();
  }
);

// ------------------------------------------------------------- SECURED ROUTES
// In these routes, it's useless to check if the user is authenticated, since he passed the AuthWall.

// Insert here all your protected routes. Here is an example
app.get("/authrequired", (req, res) => {
  // console.log(`Request for 'GET /authrequired'`);
  res.send(`You're in, congrats !\n`);
});

// ------------------------------------------------------------- 404 MANAGEMENT
app.use((req, res, next) => {
  res.setHeader("Content-Type", "text/plain");
  res
    .status(404)
    .send(
      `This page seems too be *really* missing, that's not a way of keeping you out !`
    );
});

// -------------------------------------------------------------- LAUNCH SERVER
app.listen(portServer, () => {
  // console.log(`Listening on http://localhost:${portServer}...`);
});
