import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Map, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import "./css/Geolocalisation.css";

class APIGeoloc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeesMarkers: [],
      averageKm: 0,
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

  getDistance = () => {
    let allDistances = this.props.employeeStats.distance;
    let sumKm = allDistances.reduce((a, b) => a + b, 0);
    let averageKm = sumKm / allDistances.length;
    let minimumKm = Math.min(...allDistances);
    let maximumKm = Math.max(...allDistances);
    this.setState({
      averageKm: averageKm.toFixed(1),
      min: minimumKm,
      max: maximumKm
    });
  };

  getStatistics = () => {
    let allDistances = this.props.employeeStats.distance;
    let allDurations = this.props.employeeStats.duration;
    let countPersUnder5 = 0;
    let countPers5To10 = 0;
    let countPers10To15 = 0;
    let countPers10To20 = 0;
    let countPersOver15 = 0;
    let countPersOver20 = 0;
    if (this.props.measure === "km") {
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
        if (duration <= 10) {
          countPersUnder5 = countPersUnder5 + 1;
        }
        if (duration > 10 && duration <= 20) {
          countPers5To10 = countPers5To10 + 1;
        }
        if (duration > 20 && duration <= 30) {
          countPers10To15 = countPers10To15 + 1;
        }
        if (duration > 30) {
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

  componentDidMount = () => {
    this.getDistance();
    this.getStatistics();
  };

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
        <div className="mt-3 mb-5">
          <h4>
            {this.props.mapTitle} <i className={this.props.icon} />
          </h4>
          <Col lg={{ size: 12 }}>
            {this.props.isReady === true &&
            this.props.societyPosition !== undefined ? (
              <Map
                center={this.props.societyPosition}
                zoom={10}
                className="rounded shadow mt-5 mb-4"
              >
                <TileLayer
                  attribution="&copy; <a href='http://osm.org/copyright'>MOUV'R</a> contributors"
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={this.props.societyPosition}
                  icon={societyIcon}
                />
                {this.props.employeesPositions.map(marker => {
                  return (
                    <Marker
                      key={marker}
                      position={marker}
                      icon={employeeIcon}
                    />
                  );
                })}
                <Polygon
                  positions={JSON.parse(this.props.firstPolygon)}
                  color="rgb(55, 55, 226)"
                />
                <Polygon
                  positions={JSON.parse(this.props.secondPolygon)}
                  color="rgb(224, 55, 26)"
                />
                <Polygon
                  positions={JSON.parse(this.props.thirdPolygon)}
                  color="rgb(235, 235, 8)"
                />
              </Map>
            ) : (
              <Map
                center={defaultPosition}
                zoom={10}
                className="rounded shadow mt-5 mb-4"
              >
                <TileLayer
                  attribution="&copy; <a href='http://osm.org/copyright'>MOUV'R</a> contributors"
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
              </Map>
            )}
          </Col>
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
                <ul className="list-unstyled pt-2">
                  <li>
                    <span className="bluePolygon mr-3">=====</span>
                    Inférieur à{" "}
                    {this.props.measure === "km" ? " 5 km" : "10 minutes"}
                  </li>
                  <li>
                    <span className="redPolygon mr-3">=====</span>Entre{" "}
                    {this.props.measure === "km"
                      ? " 5 et 10 km "
                      : " 10 et 20 minutes"}
                  </li>
                  <li>
                    <span className="yellowPolygon mr-3">=====</span>Entre
                    {this.props.measure === "km"
                      ? " 10 et 20 km "
                      : " 20 et 30 minutes"}
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={{ size: 8 }}>
              <div className="mb-3">
                <Container className="statistics ml-lg-5">
                  {this.props.measure === "km" &&
                  this.state.averageKm !== undefined ? (
                    <div>
                      <p>
                        Distance domicile-lieu de travail en moyenne :
                        <br />
                        <span className="stats">{this.state.averageKm} km</span>
                      </p>
                      <p>
                        Distance domicile-lieu de travail minimale :
                        <br />
                        <span className="stats">{this.state.min} km</span>
                      </p>
                      <p>
                        Distance domicile-lieu de travail maximale :
                        <br />
                        <span className="stats">{this.state.max} km</span>
                      </p>
                      <br />
                    </div>
                  ) : (
                    ""
                  )}
                  <p>
                    <img
                      src="./img/right-arrow.png"
                      alt="arrow"
                      width="25"
                      height="20"
                      className="float-left mt-1 mr-1"
                    />
                    <b>
                      {this.props.lengthEmployee} salariés ont été géolocalisés
                      :
                    </b>
                  </p>
                  {this.props.measure === "km" ? (
                    <div>
                      <p>
                        {this.state.nbPersUnder5} salarié
                        {this.state.nbPersUnder5 > 1 ? "s" : ""} (
                        {this.state.percentUnder5}%) habite
                        {this.state.nbPersUnder5 > 1 ? "nt" : ""} à moins de 5
                        km en voiture de son lieu de travail.
                      </p>
                      <p>
                        {this.state.nbPers5To10} salarié
                        {this.state.nbPers5To10 > 1 ? "s" : ""} (
                        {this.state.percent5To10}%) habite
                        {this.state.nbPers5To10 > 1 ? "nt" : ""} entre 5 et 10
                        km en voiture de son lieu de travail.
                      </p>
                      <p>
                        {this.state.nbPers10To20} salarié
                        {this.state.nbPers10To20 > 1 ? "s" : ""} (
                        {this.state.percent10To20}%) habite
                        {this.state.nbPers10To200 > 1 ? "nt" : ""} entre 10 et
                        20 km en voiture de son lieu de travail.
                      </p>
                      <p>
                        {this.state.nbPersOver20} salarié
                        {this.state.nbPersOver20 > 1 ? "s" : ""} (
                        {this.state.percentOver20}%) habite
                        {this.state.nbPersOver20 > 1 ? "nt" : ""} à plus de 20
                        km en voiture de son lieu de travail.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        {this.state.nbPersUnder5} salarié
                        {this.state.nbPersUnder5 > 1 ? "s" : ""} (
                        {this.state.percentUnder5}%) habite
                        {this.state.nbPersUnder5 > 1 ? "nt" : ""} à moins de 10
                        minutes à vélo de son lieu de travail.
                      </p>
                      <p>
                        {this.state.nbPers5To10} salarié
                        {this.state.nbPers5To10 > 1 ? "s" : ""} (
                        {this.state.percent5To10}%) habite
                        {this.state.nbPers5To10 > 1 ? "nt" : ""} entre 10 et 20
                        minutes à vélo de son lieu de travail.
                      </p>
                      <p>
                        {this.state.nbPers10To15} salarié
                        {this.state.nbPers10To15 > 1 ? "s" : ""} (
                        {this.state.percent10To15}%) habite
                        {this.state.nbPers10To15 > 1 ? "nt" : ""} entre 20 et 30
                        minutes à vélo de son lieu de travail.
                      </p>
                      <p>
                        {this.state.nbPersOver15} salarié
                        {this.state.nbPersOver15 > 1 ? "s" : ""} (
                        {this.state.percentOver15}%) habite
                        {this.state.nbPersOver15 > 1 ? "nt" : ""} à plus de 30
                        minutes à vélo de son lieu de travail.
                      </p>
                    </div>
                  )}
                </Container>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default APIGeoloc;
