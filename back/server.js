const express = require("express");
const app = express();
const session = require("express-session");
const port = 8080;
const connection = require("./conf");
const bodyParser = require("body-parser");

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


let nbSession = 1;

app.use(
  session({
    secret: "password",
    saveUninitialized: false,
    resave: false
  })
);

app.get("/auth", (req, res) => {
  sess = req.session;
  if (sess.admin) {
    res.send(String(sess.admin));
  } else {
    sess.admin = nbSession;
    res.send("Initialize new session");
  }
  nbSession++;
  console.log(nbSession);
});


app.post("/inscription", (req, res) => {
  if (req.body) {
    const formData = req.body;
    connection.query("INSERT INTO user SET ?", formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("The database crashed BOUM !");
      } else {
        res.status(201).send("SUCCESS");
      }
    });
  } else {
    console.log("Wrong use of POST /answer !");
    res.status(403).send("You must provide all informations !");
  }
});


app.post("/connexion", (req, res) => {
  if (req.body) {
    console.log(req.body);
    const formData = req.body;
    connection.query(
      `SELECT * FROM user WHERE mail = "${req.body.mail}"`,
      formData,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("The database crashed BOUM !");
        } else {
          console.log(results);
          if (results.length === 0) {
            res.status(500).send("This mail doesn't exist");
          } else {
            res.status(201).send("SUCCESS");
          }
        }
      }
    );
  } else {
    console.log("Wrong use of POST /answer !");
    res.status(403).send("You must provide all informations !");
  }
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${port}`);
});
