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
      to: 'etude.ouvert@gmail.com',
      subject: "Nouveau message - Mouv'R",
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send('An error occured with confirmation e-mail after sign up.');
      }
    });
  });
  res.status(200).send('SUCCESS');
});

app.all('/*', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  next();
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
      to: 'etude.ouvert@gmail.com',
      subject: "Nouveau message - MOUV'R",
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send('An error occured with confirmation e-mail after sign up.');
      }
    });
  });
  res.status(200).send('SUCCESS');
});

app.get('/monespace', (req, res) => {
  res.status(200).send('Mon espace');
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

app.post('/user/list/survey', (req, res) => {
  const userId = req.body.user_id;
  dbHandle.query(
    `SELECT survey_name, user_id FROM survey WHERE user_id = ${userId}`,
    (err, results) => {
      if (err) {
        res.status(500).send('The database crashed ! The reason is ' + err);
      } else {
        res.json(results);
      }
    }
  );
});

app.get('/user/resultat', (req, res) => {
  dbHandle.query(
    'SELECT genre,age,principal_transport_one,principal_transport_two,principal_transport_three,ocasionaly_transport_one,ocasionaly_transport_two,ocasionaly_transport_three,reason_transport,distance_klm,distance_min,distance_money,elements_one,elements_two,elements_three,parking_place,midday,frequency_midday,transport_midday,frequency_pro,distance_pro,deplacement_pro,reason_perso_car,deplacement_method_pro,commun_transport_one,commun_transport_two,commun_transport_three,bike_one,bike_two,bike_three,carpooling_one,carpooling_two,carpooling_three,survey_name,id_rh FROM response',
    (err, results) => {
      if (err) {
        res.status(500).send('The database crashed ! The reason is ' + err);
      } else {
        res.status(200).json(results);
      }
    }
  );
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
      subject: 'Enquête de mobilité ✔',
      html: `<h1>Enquête de mobilité</h1><p>Votre employeur vous a envoyé une enquête permettant de mieux connaître vos habitudes de déplacement pour vous rendre sur votre lieu de travail</p><p>Nous vous remercions de bien vouloir y répondre, cela ne prendra que quelques minutes.</p><a href='http://localhost:3000/enquete/${tokenSurvey}'>Cliquez sur ce lien</a><p>Bien à vous,</p><p>L'équipe Mov'R</p>`
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

app.post('/user/geolocation/employee', (req, res) => {
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

app.post('/user/geolocation/society', (req, res) => {
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

app.post('/user/geolocation/list', (req, res) => {
  const userId = req.body.user_id;
  let query = `SELECT address, is_ready FROM map WHERE user_id = ${userId}`;
  dbHandle.query(query, (err, results) => {
    if (err) {
      res.status(500).send('The database crashed ! The reason is ' + err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/user/geolocation/results', (req, res) => {
  const userId = req.body.user_id;
  const address = req.body.address;
  dbHandle.query(
    `SELECT is_ready FROM map WHERE map.user_id = ${userId} AND address = "${address}"`,
    (err, results) => {
      if (err) {
        res.status(500).send('The database crashed ! The reason is ' + err);
      } else {
        results.map(result => {
          let isReady = result.is_ready;
          if (isReady === 1) {
            dbHandle.query(
              `SELECT maps_employee.id AS emp_id, concat(maps_employee.lat, ",", maps_employee.lng) AS employeesPositions, maps_employee.distance AS emp_distance, maps_employee.duration AS emp_duration, maps_employee.map_id AS emp_map_id, map.lat AS map_lat, map.lng AS map_lng, map.isochrone5_auto, map.isochrone10_auto, map.isochrone20_auto, map.isochrone5_cycle, map.isochrone10_cycle, map.isochrone15_cycle FROM maps_employee INNER JOIN map ON maps_employee.map_id = map.id WHERE map.user_id = "${userId}" AND map.address = "${address}"`,
              (err, results) => {
                if (err) {
                  res.status(500).send('The database crashed ! The reason is ' + err);
                } else {
                  let allResults = {};
                  let societyData = {};
                  let employeeData = {};
                  let employeeId = [];
                  let employeesPositions = [];
                  let employeeDistance = [];
                  let employeeDuration = [];
                  results.map(result => {
                    let allId = [];
                    allId.push(result.emp_id);
                    allId.map(id => {
                      employeeId.push(id);
                    });
                    let allEmployeesPositions = [];
                    allEmployeesPositions.push(result.employeesPositions);
                    allEmployeesPositions.map(position => {
                      employeesPositions.push(position);
                    });
                    let allDistance = [];
                    allDistance.push(result.emp_distance);
                    allDistance.map(distance => {
                      employeeDistance.push(distance);
                    });
                    let allDuration = [];
                    allDuration.push(result.emp_duration);
                    allDuration.map(duration => {
                      employeeDuration.push(duration);
                    });
                    employeeData = {
                      id: employeeId,
                      position: employeesPositions,
                      distance: employeeDistance,
                      duration: employeeDuration,
                      map_id: result.emp_map_id
                    };
                    societyData = {
                      lat: result.map_lat,
                      lng: result.map_lng,
                      isochrone5_auto: result.isochrone5_auto,
                      isochrone10_auto: result.isochrone10_auto,
                      isochrone20_auto: result.isochrone20_auto,
                      isochrone5_cycle: result.isochrone5_cycle,
                      isochrone10_cycle: result.isochrone10_cycle,
                      isochrone15_cycle: result.isochrone15_cycle
                    };
                  });
                  allResults = {
                    employeeData: employeeData,
                    employeeLength: employeeData.position.length,
                    societyData: societyData
                  };
                  res.json(allResults);
                }
              }
            );
          } else {
            res.status(200).send('In progress');
          }
        });
      }
    }
  );
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
          html: `<h1>Bienvenue !</h1><p>Nous avons bien reçu votre règlement et vous confirmons que votre inscription a bien été prise en compte. <br/> Vous pouvez dès à présent profiter de nos services en vous connectant à votre compte : <a href='http://localhost:3000/connexion'>Cliquez sur ce lien</a></p><p>Bien à vous,</p><p>L'équipe MOUV'R</p>`
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
          html: `<h1>Désactivation de votre compte</h1><p>Sauf erreur de notre part, nous n'avons pas reçu votre règlement pour bénéficier de nos services. Nous avons ainsi désactivé votre compte. En cas de problème, vous pouvez nous contacter par e-mail ou par téléphone : <a href='http://localhost:3000/contact'>Cliquez sur ce lien</a>.</p><p>Bien à vous,</p><p>L'équipe MOUV'R</p>`
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
  dbHandle.query('SELECT id FROM map', (err, results) => {
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
  dbHandle.query('SELECT COUNT(*) AS TotalCount FROM map', function(err, rows) {
    let startNum = 0;
    let limitNum = 5;
    if (rows) {
      totalCount = rows[0].TotalCount;
      startNum = req.body.start;
      limitNum = req.body.limit;
      let allMapData = [];
      dbHandle.query(
        `SELECT map.id AS id, map.lat AS society_lat, map.lng AS society_lng, map.address AS society_address, map.user_id, map.id AS map_id, user.company_name AS company_name, maps_employee.map_id AS emp_id, GROUP_CONCAT(maps_employee.address) AS employeeAddress, GROUP_CONCAT(maps_employee.lat, '-', maps_employee.lng) AS employeePosition FROM map INNER JOIN user ON map.user_id = user.id INNER JOIN maps_employee ON map.id = maps_employee.map_id GROUP BY maps_employee.map_id LIMIT ${limitNum} OFFSET ${startNum}`,
        function(err, result) {
          if (err) {
            res.json(err);
          } else {
            result.map(data => {
              let societyPosition = `${data.society_address} - ${data.society_lat}, ${
                data.society_lng
              }`;
              if (data.employeeAddress === null && data.employeePosition === null) {
                let tableData = {
                  companyName: data.company_name,
                  societyAddress: societyPosition,
                  employeePosition: 'En cours',
                  employeeAddress: 'En cours',

                  id: data.id
                };
                allMapData.push(tableData);
              } else {
                let tableData = {
                  companyName: data.company_name,
                  societyAddress: societyPosition,
                  employeeAddress: data.employeeAddress,
                  employeePosition: data.employeePosition,
                  id: data.id
                };
                allMapData.push(tableData);
              }
            });
            let allData = {
              totalCount: totalCount,
              tableData: allMapData
            };
            res.status(200).json(allData);
          }
        }
      );
    }
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
      `SELECT survey.survey_name, survey.starting_date, survey.ending_date, survey.user_id, user.company_name FROM survey INNER JOIN user ON survey.user_id = user.id LIMIT ${limitNum} OFFSET ${startNum}`,
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

app.listen(portServer, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }
});
