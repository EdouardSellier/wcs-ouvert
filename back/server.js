const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const { portServer } = require('./conf');
require('./passport-strategy');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', require('./auth'));

app.all('/*', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  next();
});

app.get('/authrequired', (req, res) => {
  res.send(`You're in, congrats !\n`);
});

app.get('/monespace', (req, res) => {
  console.log(`Request for 'GET /monespace'`);
  res.status(200).send('Mon espace');
});

app.post('/user/geolocation', (req, res) => {
  let positionSociety = req.body.society_position.position.reverse().toString();
  let addressSociety = req.body.society_position.address.toString();
  const regex = /\+/g;
  let correctAddressSociety = addressSociety.replace(regex, ' ');
  let correctPositionSociety = positionSociety.replace(',', ' - ');
  let sendSocietyData = `${correctAddressSociety} - (${correctPositionSociety})`;
  const employeesPositions = req.body.employees_positions;
  const sendEmployeesData = [];
  employeesPositions.map(data => {
    let correctPositionEmployee = data.position
      .reverse()
      .toString()
      .replace(',', ' - ');
    let addressEmployee = data.address.toString();
    let correctAddressEmployee = addressEmployee.replace(regex, ' ');
    let finalData = `${correctAddressEmployee} - (${correctPositionEmployee})`;
    sendEmployeesData.push(finalData);
  });
  const formData = {
    society_position: sendSocietyData,
    employees_positions: sendEmployeesData.toString()
  };
  connection.query('INSERT INTO geolocation SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.status(200).send('SUCCESS');
    }
  });
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res
    .status(404)
    .send(`This page seems too be *really* missing, that's not a way of keeping you out !`);
});

app.listen(portServer, () => {
  console.log(`Listening on http://localhost:${portServer}...`);
});
