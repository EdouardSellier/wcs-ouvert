import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Map, TileLayer } from "react-leaflet";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import L from "leaflet";
import "./css/Geolocalisation.css";

const errorMsg = {
  place: "tr",
  message:
    "Nous avons rencontré un problème, merci de retenter dans quelques minutes ou de contacter l'assistance",
  type: "danger",
  autoDismiss: 4
};

class APIGeoloc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeesPositions: [],
      employeesMarkers: [],
      firstPolygon: [],
      secondPolygon: [],
      thirdPolygon: [],
      statsKm: [],
      statsMin: [],
      average: 0,
      min: 0,
      max: 0,
      nbPersUnder5: 0,
      percentUnder5: 0,
      nbPers5To10: 0,
      percent5To10: 0,
      nbPers10To15: 0,
      percent10To15: 0,
      nbPers10To20: 0,
      percent10To20: 0,
      nbPersOver15: 0,
      percentOver15: 0,
      nbPersOver20: 0,
      percentOver20: 0,
      isClicked: false,
      mapIsLoading: false
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  /*getIsochrone = () => {
    this.setState({
      mapIsLoading: true
    });
    setTimeout(() => {
      this.setState({
        mapIsLoading: false
      });
    }, 5000);
    axios
      .get(
        `https://api.openrouteservice.org/isochrones?api_key=5b3ce3597851110001cf624889b1dbef0e6b423b9343cf6910a26059&locations=${
          this.props.addressSociety
        }&profile=${this.props.profile}&range_type=${
          this.props.rangeType
        }&range=${this.props.range}`
      )
      .then(result => {
        const firstResult = result.data.features[0].geometry.coordinates;
        const secondResult = result.data.features[1].geometry.coordinates;
        const thirdResult = result.data.features[2].geometry.coordinates;
        let firstPolygon = [];
        let secondPolygon = [];
        let thirdPolygon = [];

        firstResult.map(position => {
          return position.map(latLng => {
            let realLatLng = latLng.reverse();
            firstPolygon = this.state.firstPolygon;
            return firstPolygon.push(realLatLng);
          });
        });
        secondResult.map(position => {
          return position.map(latLng => {
            let realLatLng = latLng.reverse();
            secondPolygon = this.state.secondPolygon;
            return secondPolygon.push(realLatLng);
          });
        });
        thirdResult.map(position => {
          return position.map(latLng => {
            let realLatLng = latLng.reverse();
            thirdPolygon = this.state.thirdPolygon;
            return thirdPolygon.push(realLatLng);
          });
        });
        this.setState(
          {
            firstPolygon: firstPolygon,
            secondPolygon: secondPolygon,
            thirdPolygon: thirdPolygon
          },
          this.getLatLng()
        );
      })
      .catch(err => {
        this.alertFunctionError();
      });
  };

  getLatLng = () => {
    let allMapData = this.state.employeesPositions;
    this.props.addressEmployees.map(address => {
      let addressQuery = address.join("+").replace(" ", "+");
      return axios
        .get(`https://api-adresse.data.gouv.fr/search/?q=${addressQuery}`)
        .then(result => {
          let employeesMarkers = result.data.features[0].geometry.coordinates.reverse();
          let latLng = {
            position: employeesMarkers,
            address: addressQuery
          };
          allMapData.push(latLng);
          if (allMapData.length === this.props.addressEmployees.length) {
            this.setState(
              {
                employeesPositions: allMapData
              },
              this.getDistance()
            );
          }
          if (
            this.props.parameter === "à vélo" &&
            allMapData.length === this.props.addressEmployees.length
          ) {
            let societyPosition = {
              position: this.props.addressSociety,
              address: this.props.addressSocietyToArray
            };
            let employeesPositions = allMapData;
            let body = {
              society_position: societyPosition,
              employees_positions: employeesPositions
            };
            axios({
              method: "post",
              url: "http://localhost:8080/user/geolocation",
              data: body
            })
              .then(result => {
                if (result.status !== 200) {
                  this.alertFunctionProblem();
                }
              })
              .catch(error => {
                this.alertFunctionError();
              });
          }
        })
        .catch(error => {
          this.alertFunctionError();
        });
    });
  };

  getDistance = () => {
    const employeesPositions = this.state.employeesPositions;
    const societyPosition = this.props.addressSociety;
    employeesPositions.map(marker => {
      let employeeLatLng = marker.position.reverse();
      let query = `${societyPosition}|${employeeLatLng}`;
      return axios({
        method: "get",
        url: `https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf624889b1dbef0e6b423b9343cf6910a26059&coordinates=${query}&profile=${
          this.props.profile
        }&units=km&language=fr`
      })
        .then(res => {
          const distances = this.state.statsKm;
          const durations = this.state.statsMin;
          const distanceKm = res.data.routes[0].summary.distance;
          const distanceSec = res.data.routes[0].summary.duration;
          let distanceMin = distanceSec / 60;
          distances.push(distanceKm);
          durations.push(Math.round(distanceMin));
          let sum = distances.reduce((a, b) => a + b, 0);
          let averageKm = sum / distances.length;
          let min = Math.min(...distances);
          let max = Math.max(...distances);
          let mapData = this.state.employeesMarkers;
          let newMarkers = { position: marker.position.reverse() };
          mapData.push(newMarkers);
          this.setState(
            {
              statsMin: durations,
              statsKm: distances,
              average: averageKm.toFixed(1),
              min: min.toFixed(1),
              max: max.toFixed(1),
              employeesMarkers: mapData,
              isClicked: true
            },
            this.getStatistics()
          );
        })
        .catch(err => {
          this.alertFunctionError();
        });
    });
  };

  getStatistics = () => {
    const allDistances = this.state.statsKm;
    const allDurations = this.state.statsMin;
    let countPersUnder5 = 0;
    let countPers5To10 = 0;
    let countPers10To15 = 0;
    let countPers10To20 = 0;
    let countPersOver15 = 0;
    let countPersOver20 = 0;
    if (this.props.parameter === "en voiture") {
      allDistances.map(distance => {
        if (distance <= 5) {
          countPersUnder5 = countPersUnder5 + 1;
        }
        if (distance > 5 && distance <= 10) {
          countPers5To10 = countPers5To10 + 1;
        }
        if (distance > 10 && distance <= 20) {
          countPers10To20 = countPers10To20 + 1;
        }
        if (distance > 20) {
          countPersOver20 = countPersOver20 + 1;
        }
        return distance;
      });
      let percentUnder5 = (countPersUnder5 * 100) / allDistances.length;
      let percent5To10 = (countPers5To10 * 100) / allDistances.length;
      let percent10To20 = (countPers10To20 * 100) / allDistances.length;
      let percentOver20 = (countPersOver20 * 100) / allDistances.length;
      this.setState({
        nbPersUnder5: countPersUnder5,
        percentUnder5: Math.round(percentUnder5),
        nbPers5To10: countPers5To10,
        percent5To10: Math.round(percent5To10),
        nbPers10To20: countPers10To20,
        percent10To20: Math.round(percent10To20),
        nbPersOver20: countPersOver20,
        percentOver20: Math.round(percentOver20)
      });
    } else {
      allDurations.map(duration => {
        if (duration <= 5) {
          countPersUnder5 = countPersUnder5 + 1;
        }
        if (duration > 5 && duration <= 10) {
          countPers5To10 = countPers5To10 + 1;
        }
        if (duration > 10 && duration <= 15) {
          countPers10To15 = countPers10To15 + 1;
        }
        if (duration > 15) {
          countPersOver15 = countPersOver15 + 1;
        }
        return duration;
      });
      let percentUnder5 = (countPersUnder5 * 100) / allDistances.length;
      let percent5To10 = (countPers5To10 * 100) / allDistances.length;
      let percent10To15 = (countPers10To15 * 100) / allDistances.length;
      let percentOver15 = (countPersOver15 * 100) / allDistances.length;
      this.setState({
        nbPersUnder5: countPersUnder5,
        percentUnder5: Math.round(percentUnder5),
        nbPers5To10: countPers5To10,
        percent5To10: Math.round(percent5To10),
        nbPers10To15: countPers10To15,
        percent10To15: Math.round(percent10To15),
        nbPersOver15: countPersOver15,
        percentOver15: Math.round(percentOver15)
      });
    }
  };*/

  render() {
    const defaultPosition = [50.62925, 3.057256];
    const societyIcon = L.icon({
      iconUrl: "./img/societyMarker.png",
      iconSize: [30, 30]
    });
    const employeeIcon = L.icon({
      iconUrl: "./img/employeeMarker.png",
      iconSize: [30, 30]
    });
    return (
      <div>
        <NotificationAlert ref="notificationAlertError" />
        <Col lg={{ size: 10, offset: 1 }}>
          <div className="card mt-5 mb-5 p-3">
            <h1 className="mb-3 mt-3">
              Résultat de la Géolocalisation de vos salariés
            </h1>
            <Col lg={{ size: 10, offset: 1 }}>
              <Map
                center={defaultPosition}
                zoom={10}
                className="rounded shadow mb-4"
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
              </Map>
            </Col>
            <Container className="mt-3">
              <Row>
                <Col lg={{ size: 4 }}>
                  <div className="legend mr-lg-4">
                    <legend>Légende</legend>
                    <ul className="list-unstyled">
                      <li>
                        <img
                          src="./img/societyMarker.png"
                          alt="societyMarker"
                          width="30"
                          height="30"
                          className="mb-2"
                        />
                        Entreprise
                      </li>
                      <li>
                        <img
                          src="./img/employeeMarker.png"
                          alt="employeeMarker"
                          width="30"
                          height="30"
                        />
                        Salariés
                      </li>
                    </ul>
                    <h6>
                      Statistiques : <i className="fa fa-auto" /> :
                    </h6>
                    <ul className="list-unstyled">
                      <li>
                        <span className="bluePolygon mr-3">=====</span>Inférieur
                        à 5 km
                      </li>
                      <li>
                        <span className="redPolygon mr-3">=====</span>Entre 5 et
                        10 km
                      </li>
                      <li>
                        <span className="yellowPolygon mr-3">=====</span>Entre
                        10 et 20 km
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={{ size: 8 }}>
                  <div className="mb-3">
                    <Container className="statistics ml-lg-5">
                      <div>
                        <p>
                          Distance domicile-lieu de travail en moyenne :
                          <br />
                        </p>
                        <p>
                          Distance domicile-lieu de travail minimale :
                          <br />
                        </p>
                        <p>
                          Distance domicile-lieu de travail maximale :
                          <br />
                        </p>
                        <br />
                      </div>

                      <p>
                        <img
                          src="./img/right-arrow.png"
                          alt="arrow"
                          width="25"
                          height="20"
                          className="float-left mt-1 mr-1"
                        />
                        <b>
                          Sur les 0 salariés enregistrés, 0 ont été géolocalisés
                          :
                        </b>
                      </p>
                    </Container>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </div>
    );
  }
}

export default APIGeoloc;
