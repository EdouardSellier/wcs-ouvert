const { dbHandle, userTransporter, apiKey } = require('./conf');
const axios = require('axios');
const nodemailer = require('nodemailer');

getEmployeePosition = () => {
  dbHandle.query(
    'SELECT id, address FROM maps_employee WHERE lat IS NULL AND lng IS NULL AND distance IS NULL AND duration IS NULL LIMIT 35',
    (err, results) => {
      if (results) {
        const regex = /\ /gi;
        results.map(data => {
          let queryAddress = data.address.replace(regex, '+');
          let idAddress = data.id;
          axios.get(`https://api-adresse.data.gouv.fr/search/?q=${queryAddress}`).then(res => {
            let results = res.data.features[0].geometry.coordinates;
            dbHandle.query(
              `UPDATE maps_employee SET lat = ${results[1]}, lng = ${
                results[0]
              } WHERE id = ${idAddress}`,
              (err, results) => {
                if (results) {
                  return;
                }
              }
            );
          });
        });
      }
    }
  );
};

getDistance = () => {
  dbHandle.query(
    'SELECT maps_employee.id as emp_id, maps_employee.lat as emp_lat, maps_employee.lng as emp_lng, map.lat as map_lat, map.lng as map_lng FROM maps_employee INNER JOIN map ON maps_employee.map_id = map.id WHERE distance IS NULL AND maps_employee.lat IS NOT NULL AND maps_employee.lng IS NOT NULL LIMIT 35',
    (err, results) => {
      if (results) {
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
          let query = `${data.map_lng},${data.map_lat}|${data.emp_lng},${data.emp_lat}`;
          axios
            .get(
              `https://api.openrouteservice.org/directions?api_key=${
                apiKey.key
              }&coordinates=${query}&profile=driving-car&units=km&language=fr`
            )
            .then(result => {
              let distanceKm = [result.data.routes[0].summary.distance.toFixed(1)];
              dbHandle.query(
                `UPDATE maps_employee SET distance = ${distanceKm} WHERE id = ${data.emp_id}`,
                (err, results) => {
                  if (results) {
                    return;
                  }
                }
              );
            });
        });
      }
    }
  );
};

getDuration = () => {
  dbHandle.query(
    'SELECT maps_employee.id as emp_id, maps_employee.lat as emp_lat, maps_employee.lng as emp_lng, map.lat as map_lat, map.lng as map_lng FROM maps_employee INNER JOIN map ON maps_employee.map_id = map.id WHERE duration IS NULL AND maps_employee.lat IS NOT NULL AND maps_employee.lng IS NOT NULL LIMIT 35',
    (err, results) => {
      if (results) {
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
          let query = `${data.map_lng},${data.map_lat}|${data.emp_lng},${data.emp_lat}`;
          axios
            .get(
              `https://api.openrouteservice.org/directions?api_key=${
                apiKey.key
              }&coordinates=${query}&profile=cycling-regular&units=km&language=fr`
            )
            .then(result => {
              let durationSec = result.data.routes[0].summary.duration;
              let durationMin = (durationSec / 60).toFixed(0);
              dbHandle.query(
                `UPDATE maps_employee SET duration = ${durationMin} WHERE id = ${data.emp_id}`,
                (err, results) => {
                  if (results) {
                    return;
                  }
                }
              );
            });
        });
      }
    }
  );
};

getIsochroneAuto = () => {
  dbHandle.query(
    'SELECT id, lat, lng FROM map WHERE lat IS NOT NULL AND lng IS NOT NULL AND isochrone5_auto IS NULL AND isochrone10_auto IS NULL AND isochrone20_auto IS NULL',
    (err, results) => {
      if (results) {
        results.map(data => {
          let query = [data.lng, data.lat];
          axios
            .get(
              `https://api.openrouteservice.org/isochrones?api_key=${
                apiKey.key
              }&locations=${query}&profile=driving-car&range_type=distance&range=5000,10000,20000`
            )
            .then(result => {
              let isochroneAuto5 = result.data.features[0].geometry.coordinates[0];
              let allFirstPoints = [];
              isochroneAuto5.map(data => {
                let arrayToStr = data.reverse();
                allFirstPoints.push(arrayToStr);
              });
              let firstPolygon = {
                isochrone5_auto: JSON.stringify(allFirstPoints)
              };
              let isochroneAuto10 = result.data.features[1].geometry.coordinates[0];
              let allSecondPoints = [];
              isochroneAuto10.map(data => {
                let arrayToStr = data.reverse();
                allSecondPoints.push(arrayToStr);
              });
              let secondPolygon = {
                isochrone10_auto: JSON.stringify(allSecondPoints)
              };
              let isochroneAuto20 = result.data.features[2].geometry.coordinates[0];
              let allThirdPoints = [];
              isochroneAuto20.map(data => {
                let arrayToStr = data.reverse();
                allThirdPoints.push(arrayToStr);
              });
              let thirdPolygon = {
                isochrone20_auto: JSON.stringify(allThirdPoints)
              };
              dbHandle.query(
                `UPDATE map SET ?
                WHERE id = ${data.id}`,
                [firstPolygon],
                (err, results) => {
                  if (results) {
                    dbHandle.query(
                      `UPDATE map SET ?
                      WHERE id = ${data.id}`,
                      [secondPolygon],
                      (err, results) => {
                        if (results) {
                          dbHandle.query(
                            `UPDATE map SET ?
                            WHERE id = ${data.id}`,
                            [thirdPolygon],
                            (err, results) => {
                              if (results) {
                                return;
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            });
        });
      }
    }
  );
};

getIsochroneCycle = () => {
  dbHandle.query(
    'SELECT id, lat, lng FROM map WHERE lat IS NOT NULL AND lng IS NOT NULL AND isochrone5_cycle IS NULL AND isochrone10_cycle IS NULL AND isochrone15_cycle IS NULL',
    (err, results) => {
      if (results) {
        results.map(data => {
          let query = [data.lng, data.lat];
          axios
            .get(
              `https://api.openrouteservice.org/isochrones?api_key=${
                apiKey.key
              }&locations=${query}&profile=cycling-regular&range_type=time&range=600,1200,1800`
            )
            .then(result => {
              let isochroneCycle5 = result.data.features[0].geometry.coordinates[0];
              let allFirstPoints = [];
              isochroneCycle5.map(data => {
                let arrayToStr = data.reverse();
                allFirstPoints.push(arrayToStr);
              });
              let firstPolygon = {
                isochrone5_cycle: JSON.stringify(allFirstPoints)
              };
              let isochroneCycle10 = result.data.features[1].geometry.coordinates[0];
              let allSecondPoints = [];
              isochroneCycle10.map(data => {
                let arrayToStr = data.reverse();
                allSecondPoints.push(arrayToStr);
              });
              let secondPolygon = {
                isochrone10_cycle: JSON.stringify(allSecondPoints)
              };
              let isochroneCycle15 = result.data.features[2].geometry.coordinates[0];
              let allThirdPoints = [];
              isochroneCycle15.map(data => {
                let arrayToStr = data.reverse();
                allThirdPoints.push(arrayToStr);
              });
              let thirdPolygon = {
                isochrone15_cycle: JSON.stringify(allThirdPoints)
              };
              dbHandle.query(
                `UPDATE map SET ?
                WHERE id = ${data.id}`,
                [firstPolygon],
                (err, results) => {
                  if (results) {
                    dbHandle.query(
                      `UPDATE map SET ?
                      WHERE id = ${data.id}`,
                      [secondPolygon],
                      (err, results) => {
                        if (results) {
                          dbHandle.query(
                            `UPDATE map SET ?
                            WHERE id = ${data.id}`,
                            [thirdPolygon],
                            (err, results) => {
                              if (results) {
                                return;
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            });
        });
      }
    }
  );
};

checkValidateMaps = () => {
  dbHandle.query(
    'SELECT distinct(mail), user.id FROM user INNER JOIN map ON map.user_id = user.id INNER JOIN maps_employee ON maps_employee.map_id = map.id WHERE maps_employee.lat IS NOT NULL AND maps_employee.lng IS NOT NULL AND maps_employee.distance IS NOT NULL AND maps_employee.duration IS NOT NULL AND map.is_ready = 0',
    (err, results) => {
      if (results) {
        let allMails = [];
        results.map(data => {
          allMails.push({ mail: data.mail, id: data.id });
        });
        allMails.map(data => {
          let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: userTransporter.user,
              pass: userTransporter.pass
            }
          });
          let mailOptions = {
            from: '"MOUV-R" <no-reply@mouv-r.com>',
            to: data.mail,
            subject: 'Votre géolocalisation est prête ✔',
            html: `<p>Madame, Monsieur,</p><p>L'analyse des trajets de vos employés est prête, vous pouvez dès à présent vous rendre sur votre espace pour consulter les résultats</p><p>Bonne journée,</p><p>Edouard Sellier, chargé de mission mobilité au sein du bureau d’écolonomie OUVERT</p>`
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (info) {
              dbHandle.query(
                `UPDATE map SET is_ready = 1
                    WHERE user_id = ${data.id}`,
                (err, results) => {
                  if (results) {
                    return;
                  }
                }
              );
            }
          });
        });
      }
    }
  );
};

const main = async () => {
  getEmployeePosition();
  getIsochroneAuto();
  getIsochroneCycle();
  getDistance();
  getDuration();
  checkValidateMaps();
  await closeScript();
};

const closeScript = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(dbHandle.end()), 10000);
  });
};
main();
