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

app.post('/user/survey', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO survey SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.status(200).send('SUCCESS');
    }
  });
});

app.get('/user/list/survey', (req, res) => {
  connection.query('SELECT survey_name FROM survey', (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.json(results);
    }
  });
});

app.post('/user/send/survey', (req, res) => {
  const mailsArray = req.body.mails;
  mailsArray.map(mail => {
    let tokenSurvey = uuidv4();
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: userTransporter.user,
          pass: userTransporter.pass
        }
      });
      let mailOptions = {
        from: '"OUVERT" <no-reply@ouvert.com>',
        to: mail,
        subject: 'Sondage de mobilité ✔',
        html: `<h1>Sondage de mobilité</h1><p>Votre employeur vous a envoyé un sondage permettant de mieux connaître vos habitudes de déplacement pour vous rendre sur votre lieu de travail</p><p>Nous vous remercions de bien vouloir y répondre, cela ne prendra que quelques minutes.</p><a href='http://localhost:3000/sondage/${tokenSurvey}'>Cliquez sur ce lien</a><p>Bien à vous,</p><p>L'équipe Mov'R</p>`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send('An error occured during mail sending.');
        }
        res.status(200).send('SUCCESS');
      });
    });
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
