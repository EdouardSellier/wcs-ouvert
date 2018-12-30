import React, { Component } from "react";
import "./css/Geolocalisation.css";
import { Container, Row, Col } from "reactstrap";
import { Map, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import NotificationAlert from "react-notification-alert";

const errorMsg = {
  place: "tr",
  message:
    "Nous avons rencontré un problème lors du chargement, merci de retenter dans quelques minutes ou de contacter l'assistance",
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
      isClicked: false
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  getIsochrone = () => {
    axios
      .get(
        `https://api.openrouteservice.org/isochrones?api_key=5b3ce3597851110001cf624884e9b90603e34a1bba9744ae0c73fd0a&locations=${
          this.props.addressSociety
        }&profile=${this.props.profile}&range_type=${
          this.props.rangeType
        }&range=${this.props.range}`
      )
      .then(result => {
        let firstResult = result.data.features[0].geometry.coordinates;
        let secondResult = result.data.features[1].geometry.coordinates;
        let thirdResult = result.data.features[2].geometry.coordinates;
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
        this.setState({
          firstPolygon: firstPolygon,
          secondPolygon: secondPolygon,
          thirdPolygon: thirdPolygon
        });
      })
      .catch(err => {
        this.alertFunctionError();
      });
  };

  getLatLng = () => {
    this.props.addressEmployees.map((address, id) => {
      let addressQuery = address.join("+").replace(" ", "+");
      return axios
        .get(`https://api-adresse.data.gouv.fr/search/?q=${addressQuery}`)
        .then(result => {
          let employeesMarkers = result.data.features[0].geometry.coordinates.reverse();
          let latLng = { id: id + 1, position: employeesMarkers };
          let allMapData = this.state.employeesPositions;
          allMapData.push(latLng);
          this.setState({
            employeesPositions: allMapData
          });
          if (
            this.props.parameter === "à vélo" &&
            allMapData.length === this.props.addressEmployees.length
          ) {
            let societyPosition = this.props.addressSociety;
            let employeesPositions = JSON.stringify(allMapData);
            let body = {
              society_position: societyPosition,
              employees_positions: employeesPositions
            };
            axios({
              method: "post",
              url: "http://localhost:8080/geolocation",
              data: body
            })
              .then(res => {
                if (res.status !== 200) {
                  this.alertFunctionProblem();
                }
              })
              .catch(error => {
                this.alertFunctionError();
              });
          }
        })
        .catch(err => {
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
        url: `https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf624884e9b90603e34a1bba9744ae0c73fd0a&coordinates=${query}&profile=${
          this.props.profile
        }&units=km&language=fr`
      })
        .then(res => {
          let distances = this.state.statsKm;
          let durations = this.state.statsMin;
          let distanceKm = res.data.routes[0].summary.distance;
          let distanceSec = res.data.routes[0].summary.duration;
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
            () => {
              this.getStatistics();
            }
          );
        })
        .catch(err => {
          this.alertFunctionError();
        });
    });
  };

  getStatistics = () => {
    let allDistances = this.state.statsKm;
    let allDurations = this.state.statsMin;
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
  };

  startAnalysis = () => {
    this.getLatLng();
    this.getIsochrone();
    setTimeout(() => {
      this.getDistance();
    }, 1000);
  };

  render() {
    const defaultZoom = 11.4;
    const defaultPosition = [50.62925, 3.057256];
    const societyPosition = this.props.addressSociety;
    const societyIcon = L.icon({
      iconUrl: "./img/societyMarker.png",
      iconSize: [30, 30]
    });
    const employeeIcon = L.icon({
      iconUrl: "./img/employeeMarker.png",
      iconSize: [30, 30]
    });
    const firstPolygon = [this.state.firstPolygon];
    const secondPolygon = [this.state.secondPolygon];
    const thirdPolygon = [this.state.thirdPolygon];
    return (
      <div>
        <NotificationAlert ref="notificationAlertError" />
        {this.state.isClicked === false ? (
          <button
            className="btn mt-4 mb-4 ml-3 geolocButton"
            onClick={this.startAnalysis}
          >
            Découvrir le résultat <i className={this.props.icon} />
          </button>
        ) : (
          ""
        )}

        <Row>
          <Col lg={{ size: 12 }}>
            {societyPosition.length === 0 ? (
              <Map center={defaultPosition} zoom={defaultZoom}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
              </Map>
            ) : (
              <Map center={societyPosition} zoom={defaultZoom}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={societyPosition} icon={societyIcon}>
                  <Popup>
                    <span>Société</span>
                  </Popup>
                </Marker>
                {this.state.employeesMarkers.map(marker => {
                  return (
                    <Marker
                      position={marker.position}
                      key={marker.position}
                      icon={employeeIcon}
                    />
                  );
                })}
                <Polygon positions={firstPolygon} color="rgb(55, 55, 226)" />
                <Polygon positions={secondPolygon} color="rgb(224, 55, 26)" />
                <Polygon positions={thirdPolygon} color="rgb(235, 235, 8)" />
              </Map>
            )}
          </Col>
        </Row>
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
                  {this.props.legendTitle} <i className={this.props.icon} /> :
                </h6>
                <ul className="list-unstyled">
                  <li>
                    <span className="bluePolygon mr-3">=====</span>Inférieur à 5{" "}
                    {this.props.measure}
                  </li>
                  <li>
                    <span className="redPolygon mr-3">=====</span>Entre 5 et 10
                    {this.props.measure === "km" ? " km " : " minutes"}
                  </li>
                  <li>
                    <span className="yellowPolygon mr-3">=====</span>Entre 10 et
                    {this.props.measure === "km" ? " 20 km " : " 15 minutes"}
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={{ size: 8 }}>
              <div className="card mb-3">
                <Container className="statistics ml-lg-5">
                  {this.props.parameter === "en voiture" ? (
                    <div>
                      <p>
                        {this.props.statTitle} domicile-lieu de travail en
                        moyenne :
                        <br />
                        <span className="stats">
                          {this.state.average} {this.props.measure}
                        </span>
                      </p>
                      <p>
                        {this.props.statTitle} domicile-lieu de travail minimale
                        :
                        <br />
                        <span className="stats">
                          {this.state.min} {this.props.measure}
                        </span>
                      </p>
                      <p>
                        {this.props.statTitle} domicile-lieu de travail maximale
                        :
                        <br />
                        <span className="stats">
                          {this.state.max} {this.props.measure}
                        </span>
                      </p>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                  <p>
                    <b>
                      Sur les {this.props.addressEmployees.length} salariés
                      enregistrés, {this.state.employeesMarkers.length} ont été
                      géolocalisés :
                    </b>
                  </p>
                  <ul>
                    <li>
                      {this.state.nbPersUnder5} salarié
                      {this.state.nbPersUnder5 > 1 ? "s" : ""} (
                      {this.state.percentUnder5}%) habite
                      {this.state.nbPersUnder5 > 1 ? "nt" : ""} à moins de 5
                      {this.props.measure === "km" ? " km " : " minutes "}
                      {this.props.parameter} de l'entreprise.
                    </li>
                    <li>
                      {this.state.nbPers5To10} salarié
                      {this.state.nbPers5To10 > 1 ? "s" : ""} (
                      {this.state.percent5To10}%) habite
                      {this.state.nbPers5To10 > 1 ? "nt" : ""} entre 5 et 10
                      {this.props.measure === "km" ? " km " : " minutes "}
                      {this.props.parameter} de l'entreprise.
                    </li>
                    <li>
                      {this.props.parameter === "en voiture"
                        ? this.state.nbPers10To20
                        : this.state.nbPers10To15}{" "}
                      salarié
                      {this.state.nbPers10To20 > 1 ||
                      this.state.nbPers10To15 > 1
                        ? "s"
                        : ""}{" "}
                      {this.props.parameter === "en voiture"
                        ? `(${this.state.percent10To20}%)`
                        : `(${this.state.percent10To15}%)`}{" "}
                      habite
                      {this.state.nbPers10To20 > 1 ||
                      this.state.nbPers10To15 > 1
                        ? "nt"
                        : ""}{" "}
                      entre 10 et
                      {this.props.measure === "km" ? " 20 km " : " 15 minutes "}
                      {this.props.parameter} de l'entreprise.
                    </li>
                    <li>
                      {this.props.parameter === "en voiture"
                        ? this.state.nbPersOver20
                        : this.state.nbPersOver15}{" "}
                      salarié
                      {this.state.nbPersOver20 > 1 ||
                      this.state.nbPersOver15 > 1
                        ? "s"
                        : ""}{" "}
                      {this.props.parameter === "en voiture"
                        ? `(${this.state.percentOver20}%)`
                        : `(${this.state.percentOver15}%)`}{" "}
                      habite
                      {this.state.nbPersOver20 > 1 ||
                      this.state.nbPersOver15 > 1
                        ? "nt"
                        : ""}{" "}
                      à plus de
                      {this.props.measure === "km" ? " 20 km " : " 15 minutes "}
                      {this.props.parameter} de l'entreprise.
                    </li>
                  </ul>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default APIGeoloc;
