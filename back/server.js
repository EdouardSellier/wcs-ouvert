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

app.post('/contact', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <ul>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

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
      from: req.body.email,
      to: '"OUVERT" <no-reply@ouvert.com>',
      subject: "Nouveau message - Mouv'R",
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (error) {
        res.status(500).send('An error occured with confirmation e-mail after sign up.');
      }
    });
  });
  res.status(200).send('SUCCESS');
});

app.all('/*', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  next();
});

app.get('/authrequired', (req, res) => {
  res.send(`You're in, congrats !\n`);
});

app.post('/assistance', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <ul>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

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
      from: req.body.email,
      to: '"OUVERT" <no-reply@ouvert.com>',
      subject: "Nouveau message - Mouv'R",
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (error) {
        res.status(500).send('An error occured with confirmation e-mail after sign up.');
      }
    });
  });
  res.status(200).send('SUCCESS');
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
  dbHandle.query(`INSERT INTO survey SET ?`, formData, (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.status(200).send('SUCCESS');
    }
  });
});

app.post('/user/list/survey', (req, res) => {
  const userId = req.body.user_id;
  dbHandle.query(`SELECT survey_name FROM survey WHERE user_id = ${userId}`, (err, results) => {
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

app.post('/admin/payment', (req, res) => {
  const formData = req.body;
  const idSociety = req.body.id;
  dbHandle.query(`UPDATE user SET ? WHERE user.id=${idSociety}`, formData, (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
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

/**
|--------------------------------------------------
| New test for geolocation
|--------------------------------------------------
*/

app.post('/geolocation/employee', (req, res) => {
  const employeeData = req.body.employee;
  const addressSociety = req.body.society;
  let societySql = `SELECT id FROM map WHERE address = "${addressSociety}"`;
  dbHandle.query(societySql, (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      results.map(id => {
        employeeData.map(data => {
          return data.push(id.id);
        });
      });
      let employeeSql = 'INSERT INTO maps_employee (address, map_id) VALUES ?';
      dbHandle.query(employeeSql, [employeeData], (err, results) => {
        if (err) {
          res.status(500).send('The database crashed ! The reason is ' + err);
        } else {
          res.status(200).send('Employee SUCCESS');
        }
      });
    }
  });
});

app.post('/geolocation/society', (req, res) => {
  const societyData = req.body;
  let societySql = 'INSERT INTO map SET ?';
  dbHandle.query(societySql, [societyData], (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.status(200).send('Society SUCCESS');
    }
  });
});

app.post('/geolocation/results', (req, res) => {
  const userId = req.body.user_id;
  dbHandle.query(
    `SELECT is_ready, address FROM map WHERE map.user_id = ${userId}`,
    (err, results) => {
      if (err) {
        res.status(500).send('The database crashed ! The reason is ' + err);
      } else {
        console.log(results);
        res.json(results);
      }
    }
  );
});

app.listen(portServer, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${portServer}`);
});
