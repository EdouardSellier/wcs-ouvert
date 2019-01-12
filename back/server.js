const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const { portServer, dbHandle, userTransporter } = require('./conf');
require('./passport-strategy');
const nodemailer = require('nodemailer');
const uuidv4 = require('uuid');

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
  dbHandle.query('INSERT INTO geolocation SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.status(200).send('SUCCESS');
    }
  });
});

app.post('/user/survey', (req, res) => {
  const formData = req.body;

  dbHandle.query('INSERT INTO survey SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.status(200).send('SUCCESS');
    }
  });
});

app.post('/employee/send/sondage', (req, res) => {
  const formData = req.body;

  dbHandle.query(
    `UPDATE response SET ?, date_response=NOW() WHERE token_employee='${formData.token_employee}'`,
    formData,
    (err, results) => {
      if (err) {
        res.status(500).send('The database crashed ! The reason is ' + err);
      } else {
        res.status(200).send('SUCCESS');
      }
    }
  );
});

app.get('/user/list/survey', (req, res) => {
  dbHandle.query('SELECT survey_name, user_id FROM survey', (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.json(results);
    }
  });
});

app.get('/user/resultat', (req, res) => {
  dbHandle.query('SELECT * FROM response', (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/employee/list/:token', (req, res) => {
  dbHandle.query(
    `SELECT date_response FROM response WHERE token_employee = '${req.params.token}'`,
    (err, results) => {
      if (err) {
        res.status(500).send('The database crashed ! The reason is ' + err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.post('/user/send/survey', (req, res) => {
  const mailsArray = req.body.mails;
  mailsArray.map(mail => {
    let tokenSurvey = uuidv4();
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
    });

    dbHandle.query(
      `INSERT INTO response (token_employee,survey_name,id_rh) VALUES ('${tokenSurvey}','${
        req.body.survey_name
      }','${req.body.user_id}')`,
      function(err) {
        if (err) {
          res.status(500).send('The database crashed ! The reason is ' + err);
        }
      }
    );
  });
  res.status(200).send('SUCCESS');
});

app.post('/admin/payment', (req, res) => {
  const formData = req.body;
  const idSociety = req.body.id;
  dbHandle.query(`UPDATE user SET ? WHERE user.id=${idSociety}`, formData, (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
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
        if (formData.has_paid === 1) {
          let mailOptions = {
            from: '"OUVERT" <no-reply@ouvert.com>',
            to: req.body.mail,
            subject: 'Votre inscription est confirmée ✔',
            html: `<h1>Bienvenue !</h1><p>Nous avons bien reçu votre règlement et vous confirmons que votre inscription a bien été prise en compte. <br/> Vous pouvez dès à présent profiter de nos services en vous connectant à votre compte : <a href='http://localhost:3000/connexion'>Cliquez sur ce lien</a></p><p>Bien à vous,</p><p>L'équipe Mov'R</p>`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(500).send('An error occured with confirmation e-mail after sign up.');
            }
          });
        } else if (formData.has_paid === 0) {
          let mailOptions = {
            from: '"OUVERT" <no-reply@ouvert.com>',
            to: req.body.mail,
            subject: "Votre compte n'est plus actif",
            html: `<h1>Désactivation de votre compte</h1><p>Sauf erreur de notre part, nous n'avons pas reçu votre règlement pour bénéficier de nos services. Nous avons ainsi désactivé votre compte. En cas de problème, vous pouvez nous contacter par e-mail ou par téléphone : <a href='http://localhost:3000/contact'>Cliquez sur ce lien</a>.</p><p>Bien à vous,</p><p>L'équipe Mov'R</p>`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(500).send('An error occured with confirmation e-mail after sign up.');
            }
          });
        }
      });
      res.status(200).send('SUCCESS');
    }
  });
});

app.get('/admin/list/society', (req, res) => {
  dbHandle.query(
    'SELECT company_name, siret, lastname, firstname, mail, company_address, phone_number, has_paid, id FROM user WHERE is_admin = 0',
    (err, results) => {
      if (err) {
        res.status(500).send('The database crashed ! The reason is ' + err);
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/admin/list/survey', (req, res) => {
  dbHandle.query(
    'SELECT survey_name, starting_date, ending_date, user_id FROM survey',
    (err, results) => {
      if (err) {
        res.status(500).send('The database crashed ! The reason is ' + err);
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/admin/list/geolocation', (req, res) => {
  dbHandle.query('SELECT id FROM geolocation', (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.json(results);
    }
  });
});

app.post('/admin/list/society', (req, res) => {
  let totalCount = undefined;
  dbHandle.query('SELECT COUNT(*) AS TotalCount FROM user', function(err, rows) {
    let startNum = 0;
    let limitNum = 5;
    if (err) {
      return err;
    } else {
      totalCount = rows[0].TotalCount;
      startNum = req.body.start;
      limitNum = req.body.limit;
    }
    dbHandle.query(
      `SELECT company_name, siret, lastname, firstname, mail, company_address, phone_number, has_paid, id FROM user LIMIT ${limitNum} OFFSET ${startNum}`,
      function(err, result) {
        if (err) {
          res.json(err);
        } else {
          const allData = {
            totalCount: totalCount,
            data: result
          };
          res.status(200).json(allData);
        }
      }
    );
  });
});

app.post('/admin/list/geolocation', (req, res) => {
  let totalCount = undefined;
  dbHandle.query('SELECT COUNT(*) AS TotalCount FROM geolocation', function(err, rows) {
    let startNum = 0;
    let limitNum = 5;
    if (err) {
      return err;
    } else {
      totalCount = rows[0].TotalCount;
      startNum = req.body.start;
      limitNum = req.body.limit;
    }
    dbHandle.query(
      `SELECT id, society_position, employees_positions, user_id FROM geolocation LIMIT ${limitNum} OFFSET ${startNum}`,
      function(err, result) {
        if (err) {
          res.json(err);
        } else {
          const allData = {
            totalCount: totalCount,
            data: result
          };
          res.status(200).json(allData);
        }
      }
    );
  });
});

app.post('/admin/list/survey', (req, res) => {
  let totalCount = undefined;
  dbHandle.query('SELECT COUNT(*) AS TotalCount FROM survey', function(err, rows) {
    let startNum = 0;
    let limitNum = 5;
    if (err) {
      return err;
    } else {
      totalCount = rows[0].TotalCount;
      startNum = req.body.start;
      limitNum = req.body.limit;
    }
    dbHandle.query(
      `SELECT survey_name, starting_date, ending_date, user_id FROM survey LIMIT ${limitNum} OFFSET ${startNum}`,
      function(err, result) {
        if (err) {
          res.json(err);
        } else {
          const allData = {
            totalCount: totalCount,
            data: result
          };
          res.status(200).json(allData);
        }
      }
    );
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
