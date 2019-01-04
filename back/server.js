const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const { portServer } = require('./conf');
require('./passport-strategy');

const app = express();

// ---------------------------------------------------------------- MIDDLEWARES

// enable the reading of 'req.body'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS management
app.use(cors());

// -------------------------------------------------------------- PUBLIC ROUTES
// Login, signup, everything auth-related
app.use('/auth', require('./auth'));

// Insert here all your public routes. Here is an example
app.get('/', (req, res) => {
  // console.log(`Request for 'GET /'`);
  res.status(200).send('Hello world !');
});

// -------------------------------------------------------- AUTHENTICATION WALL
// Each and every request passing here will be stopped (401 Unauthorized) if it doesn't come with proper JWT
app.all('/*', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  next();
});

// ------------------------------------------------------------- SECURED ROUTES
// In these routes, it's useless to check if the user is authenticated, since he passed the AuthWall.

// Insert here all your protected routes. Here is an example
app.get('/authrequired', (req, res) => {
  // console.log(`Request for 'GET /authrequired'`);
  res.send(`You're in, congrats !\n`);
});

app.get('/monespace', (req, res) => {
  console.log(`Request for 'GET /monespace'`);
  res.status(200).send('Mon espace');
});

// ------------------------------------------------------------- 404 MANAGEMENT
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res
    .status(404)
    .send(`This page seems too be *really* missing, that's not a way of keeping you out !`);
});

// -------------------------------------------------------------- LAUNCH SERVER
app.listen(portServer, () => {
  console.log(`Listening on http://localhost:${portServer}...`);
});
