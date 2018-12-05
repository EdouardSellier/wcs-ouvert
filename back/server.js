const express = require("express");
const app = express();
const session = require("express-session");
const port = 8080;
const connection = require("./conf");
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
          res
            .status(500)
            .send("The database crashed BOUM ! The reason is " + err);
        } else {
          nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, 
              auth: {
                user: "ouvert.wcs@gmail.com", 
                pass: "ouvert2018" 
              }
            });
            
            let mailOptions = {
              from: '"Fred Foo" <foo@example.com>', 
              to: "ouvert.wcs@gmail.com", 
              subject: "Hello ✔", 
              text: "Hello world?", 
              html: "<b>Hello world?</b>"
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
            });
          });
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
    secret: "keyboard cat",
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
        message: "There are some error with query"
      });
    } else {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, function(err, ress) {
          if (!ress) {
            res.status(500).send("WRONG");
          } else {
            let session = uuidv4();
            console.log(session);
            res.status(200).send("SUCCESS");
          }
        });
      } else {
        res.status(404).send("USER DON'T EXIST");
      }
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${port}`);
});
