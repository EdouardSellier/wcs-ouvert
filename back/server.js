const express = require("express");
const app = express();
const session = require("express-session");
const port = 8080;
const { connection, userTransporter } = require("./conf");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid/v4");
const nodemailer = require("nodemailer");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

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

app.use(
  session({
    genid: req => {
      return uuidv4();
    },
    secret: "this is a random string",
    resave: false,
    saveUninitialized: true
  })
);

app.post("/connexion", (req, res) => {
  let mail = req.body.mail;
  let password = req.body.password;
  connection.query("SELECT * FROM user WHERE mail = ?", [mail], function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.json({
        status: false,
        message: "There are some error with this query"
      });
    } else {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, function(err, ress) {
          if (!ress) {
            res.status(500).send("WRONG");
          } else {
            let session = uuidv4();
            res.status(200).send("SUCCESS");
          }
        });
      } else {
        res.status(404).send("USER DON'T EXIST");
      }
    }
  });
});

app.post("/geolocation", (req, res) => {
  let data = req.body.society_position.reverse();
  let societyPosition = JSON.stringify(data);
  let employeesPositions = req.body.employees_positions;
  const formData = {
    society_position: societyPosition,
    employees_positions: employeesPositions
  };
  connection.query(
    "INSERT INTO geolocation SET ?",
    formData,
    (err, results) => {
      if (err) {
        res.status(500).send("The database crashed ! The reason is " + err);
      } else {
        res.status(200).send("SUCCESS");
      }
    }
  );
});

app.post("/rh/survey", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO survey SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send("The database crashed ! The reason is " + err);
    } else {
      res.status(200).send("SUCCESS");
    }
  });
});

app.post("/admin/payment", (req, res) => {
  const formData = req.body;
  const idSociety = req.body.id;
  connection.query(
    `UPDATE user SET ? WHERE user.id=${idSociety}`,
    formData,
    (err, results) => {
      if (err) {
        res.status(500).send("The database crashed ! The reason is " + err);
      } else {
        nodemailer.createTestAccount((err, account) => {
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: userTransporter.user,
              pass: userTransporter.pass
            }
          });
          let mailOptions = {
            from: "no-reply@ouvert.com",
            to: req.body.mail,
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>"
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res
                .status(500)
                .send(
                  "An error occured with confirmation e-mail after sign up."
                );
            }
          });
        });
        res.status(200).send("SUCCESS");
      }
    }
  );
});

app.get("/admin/list/society", (req, res) => {
  connection.query(
    "SELECT company_name, siret, lastname, firstname, mail, company_address, phone_number, has_paid, id FROM user WHERE is_admin = 0",
    (err, results) => {
      if (err) {
        res.status(500).send("The database crashed ! The reason is " + err);
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/admin/list/survey", (req, res) => {
  connection.query(
    "SELECT survey_name, survey_address, starting_date, ending_date, user_id FROM survey",
    (err, results) => {
      if (err) {
        res.status(500).send("The database crashed ! The reason is " + err);
      } else {
        console.log(results);
        res.json(results);
      }
    }
  );
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${port}`);
});
