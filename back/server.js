const express = require("express");
const app = express();
const session = require("express-session");
const port = 8080;
const connection = require("./conf");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

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
          console.log(err);
          res.status(500).send("The database crashed BOUM !");
        } else {
          res.status(201).send("SUCCESS");
        }
      });
    });
  } else {
    console.log("Wrong use of POST /answer !");
    res.status(403).send("You must provide all informations !");
  }
});

let nbSession = 1;

app.use(
  session({
    secret: "password",
    saveUninitialized: false,
    resave: true
  })
);

/*app.get("/connexion", (req, res) => {
  sess = req.session;
  console.log(sess);
  if (sess.admin) {
    res.send(String(sess.admin));
  } else {
    sess.admin = nbSession;
    res.send("Initialize new session");
  }
  nbSession++;
  console.log(nbSession);
});*/

app.post("/connexion", (req, res) => {
  sess = req.session;
  sess.rh = nbSession;
  console.log(sess);
  nbSession++;
  console.log(nbSession);
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
        message: "there are some error with query"
      });
    } else {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, function(err, ress) {
          if (!ress) {
            res.send("WRONG");
          } else {
            res.send("SUCCESS");
          }
        });
      } else {
        res.send("DON'T EXIST");
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
