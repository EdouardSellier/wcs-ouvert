const { connection } = require("./conf");
const axios = require("axios");

getEmployeePosition = () => {
  connection.query(
    "SELECT id, address FROM maps_employee WHERE lat IS NULL AND lng IS NULL AND distance IS NULL AND duration IS NULL LIMIT 35",
    (err, results) => {
      if (err) {
        console.log("Error with DB : " + err);
      } else {
        const regex = /\ /gi;
        results.map(data => {
          let queryAddress = data.address.replace(regex, "+");
          let idAddress = data.id;
          return axios
            .get(`https://api-adresse.data.gouv.fr/search/?q=${queryAddress}`)
            .then(res => {
              let results = res.data.features[0].geometry.coordinates;
              connection.query(
                `UPDATE maps_employee SET lat = ${results[1]}, lng = ${
                  results[0]
                } WHERE id = ${idAddress}`,
                (err, results) => {
                  if (err) {
                    console.log("Error during update : " + err);
                  } else {
                    console.log("Database has updated :)");
                  }
                }
              );
            })
            .catch(error => {
              console.log("Error with API : " + error);
            });
        });
      }
    }
  );
};

getDistance = () => {
  connection.query(
    "SELECT maps_employee.id as emp_id, maps_employee.lat as emp_lat, maps_employee.lng as emp_lng, map.lat as map_lat, map.lng as map_lng FROM maps_employee INNER JOIN map ON maps_employee.map_id = map.id WHERE distance IS NULL AND duration IS NULL AND maps_employee.lat IS NOT NULL AND maps_employee.lng IS NOT NULL LIMIT 35",
    (err, results) => {
      if (err) {
        console.log("Error with DB : " + err);
      } else {
        let allData = [];
        results.map(data => {
          let mapData = {
            emp_id: data.emp_id,
            emp_lat: data.emp_lat,
            emp_lng: data.emp_lng,
            map_lat: data.map_lat,
            map_lng: data.map_lng
          };
          allData.push(mapData);
        });
        allData.map(data => {
          let query = `${data.map_lng},${data.map_lat}|${data.emp_lng},${
            data.emp_lat
          }`;
          axios
            .get(
              `https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf624889b1dbef0e6b423b9343cf6910a26059&coordinates=${query}&profile=driving-car&units=km&language=fr`
            )
            .then(result => {
              let distanceKm = [
                result.data.routes[0].summary.distance.toFixed(1)
              ];
              let durationSec = result.data.routes[0].summary.duration;
              let durationMin = (durationSec / 60).toFixed(0);
              connection.query(
                `UPDATE maps_employee SET distance = ${distanceKm}, duration = ${durationMin} WHERE id = ${
                  data.emp_id
                }`,
                (err, results) => {
                  if (err) {
                    console.log("Error during update : " + err);
                  } else {
                    console.log("Database has updated :)");
                  }
                }
              );
            })
            .catch(error => {
              console.log("Error with distance API : " + error);
            });
        });
      }
    }
  );
};

getIsochroneAuto = () => {
  connection.query(
    "SELECT id, lat, lng FROM map WHERE lat IS NOT NULL AND lng IS NOT NULL AND isochrone5_auto IS NULL AND isochrone10_auto IS NULL AND isochrone20_auto IS NULL",
    (err, results) => {
      if (err) {
        console.log("Error with DB : " + err);
      } else {
        results.map(data => {
          let query = [data.lng, data.lat];
          return axios
            .get(
              `https://api.openrouteservice.org/isochrones?api_key=5b3ce3597851110001cf624889b1dbef0e6b423b9343cf6910a26059&locations=${query}&profile=driving-car&range_type=distance&range=5000,10000,20000`
            )
            .then(result => {
              let isochroneAuto5 =
                result.data.features[0].geometry.coordinates[0];
              let allFirstPoints = [];
              isochroneAuto5.map(data => {
                let arrayToStr = data.reverse();
                allFirstPoints.push(arrayToStr);
              });
              let firstPolygon = {
                isochrone5_auto: JSON.stringify(allFirstPoints)
              };
              let isochroneAuto10 =
                result.data.features[1].geometry.coordinates[0];
              let allSecondPoints = [];
              isochroneAuto10.map(data => {
                let arrayToStr = data.reverse();
                allSecondPoints.push(arrayToStr);
              });
              let secondPolygon = {
                isochrone10_auto: JSON.stringify(allSecondPoints)
              };
              let isochroneAuto20 =
                result.data.features[2].geometry.coordinates[0];
              let allThirdPoints = [];
              isochroneAuto20.map(data => {
                let arrayToStr = data.reverse();
                allThirdPoints.push(arrayToStr);
              });
              let thirdPolygon = {
                isochrone20_auto: JSON.stringify(allThirdPoints)
              };
              connection.query(
                `UPDATE map SET ?
                WHERE id = ${data.id}`,
                [firstPolygon],
                (err, results) => {
                  if (err) {
                    console.log("Error during update : " + err);
                  } else {
                    console.log("Database has updated :)");
                    connection.query(
                      `UPDATE map SET ?
                      WHERE id = ${data.id}`,
                      [secondPolygon],
                      (err, results) => {
                        if (err) {
                          console.log("Error during update : " + err);
                        } else {
                          console.log("Database has updated :)");
                          connection.query(
                            `UPDATE map SET ?
                            WHERE id = ${data.id}`,
                            [thirdPolygon],
                            (err, results) => {
                              if (err) {
                                console.log("Error during update : " + err);
                              } else {
                                console.log("Database has updated !!! :)");
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            })
            .catch(error => {
              console.log("Error with API : " + error);
            });
        });
      }
    }
  );
};

getIsochroneCycle = () => {
  connection.query(
    "SELECT id, lat, lng FROM map WHERE lat IS NOT NULL AND lng IS NOT NULL AND isochrone5_auto IS NOT NULL AND isochrone10_auto IS NOT NULL AND NOT isochrone20_auto IS NULL AND isochrone5_cycle IS NULL AND isochrone10_cycle IS NULL AND isochrone15_cycle IS NULL",
    (err, results) => {
      if (err) {
        console.log("Error with DB : " + err);
      } else {
        results.map(data => {
          let query = [data.lng, data.lat];
          return axios
            .get(
              `https://api.openrouteservice.org/isochrones?api_key=5b3ce3597851110001cf624889b1dbef0e6b423b9343cf6910a26059&locations=${query}&profile=cycling-regular&range_type=time&range=300,600,900`
            )
            .then(result => {
              let isochroneCycle5 =
                result.data.features[0].geometry.coordinates[0];
              let allFirstPoints = [];
              isochroneCycle5.map(data => {
                let arrayToStr = data.reverse();
                allFirstPoints.push(arrayToStr);
              });
              let firstPolygon = {
                isochrone5_cycle: JSON.stringify(allFirstPoints)
              };
              let isochroneCycle10 =
                result.data.features[1].geometry.coordinates[0];
              let allSecondPoints = [];
              isochroneCycle10.map(data => {
                let arrayToStr = data.reverse();
                allSecondPoints.push(arrayToStr);
              });
              let secondPolygon = {
                isochrone10_cycle: JSON.stringify(allSecondPoints)
              };
              let isochroneCycle15 =
                result.data.features[2].geometry.coordinates[0];
              let allThirdPoints = [];
              isochroneCycle15.map(data => {
                let arrayToStr = data.reverse();
                allThirdPoints.push(arrayToStr);
              });
              let thirdPolygon = {
                isochrone15_cycle: JSON.stringify(allThirdPoints)
              };
              connection.query(
                `UPDATE map SET ?
                WHERE id = ${data.id}`,
                [firstPolygon],
                (err, results) => {
                  if (err) {
                    console.log("Error during update : " + err);
                  } else {
                    console.log("Database has updated :)");
                    connection.query(
                      `UPDATE map SET ?
                      WHERE id = ${data.id}`,
                      [secondPolygon],
                      (err, results) => {
                        if (err) {
                          console.log("Error during update : " + err);
                        } else {
                          console.log("Database has updated :)");
                          connection.query(
                            `UPDATE map SET ?
                            WHERE id = ${data.id}`,
                            [thirdPolygon],
                            (err, results) => {
                              if (err) {
                                console.log("Error during update : " + err);
                              } else {
                                console.log("Database has updated !!! :)");
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            })
            .catch(error => {
              console.log("Error with API : " + error);
            });
        });
      }
    }
  );
};

main = () => {
  getEmployeePosition();
  getDistance();
  getIsochroneAuto();
  getIsochroneCycle();
};

main();

connection.end(function(err) {
  // The connection is terminated now
  console.log("end " + err);
});
