const { connection, userTransporter } = require("./conf");
const axios = require("axios");

getEmployeePosition = () => {
  connection.query(
    "SELECT address FROM map WHERE lat IS NULL AND lng IS NULL LIMIT 40",
    (err, results) => {
      if (err) {
        res.status(500).send("The database crashed ! The reason is " + err);
      } else {
        const regex = /\ /gi;
        results.map(address => {
          let queryAddress = address.address.replace(regex, "+");
          console.log(queryAddress);
          axios
            .get(`https://api-adresse.data.gouv.fr/search/?q=${queryAddress}`)
            .then(result => {
              console.log(result.data.features[0].geometry.coordinates);
            })
            .catch(error => {
              console.log(error);
            });
        });
        res.json(results);
      }
    }
  );
};
