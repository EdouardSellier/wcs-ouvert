import React, { Component } from "react";
import GeoStatistics from "./GeoStatistics";
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
      mapData: [],
      firstPolygon: [],
      secondPolygon: [],
      thirdPolygon: []
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  getLatLng = () => {
    this.props.addressEmployee.map(data => {
      let dataStr = data.join("+").replace(" ", "+");
      return axios
        .get(`https://api-adresse.data.gouv.fr/search/?q=${dataStr}`)
        .then(result => {
          let newData = result.data.features[0].geometry.coordinates;
          newData.reverse();
          let latLng = { marker: newData };
          let allMapData = this.state.mapData;
          allMapData.push(latLng);
          this.setState({
            mapData: allMapData
          });
        })
        .catch(err => {
          this.alertFunctionError();
        });
    });
  };

  getIsochrone = () => {
    let center = undefined;
    if (
      this.props.profile === "cycling-regular" ||
      this.props.profile === "foot-walking"
    ) {
      center = this.props.addressSociety;
    } else {
      center = this.props.addressSociety.reverse();
    }
    axios
      .get(
        `https://api.openrouteservice.org/isochrones?api_key=5b3ce3597851110001cf624884e9b90603e34a1bba9744ae0c73fd0a&locations=${center}&profile=${
          this.props.profile
        }&range_type=${this.props.rangeType}&range=${this.props.range}`
      )
      .then(result => {
        let firstRes = result.data.features[0].geometry.coordinates;
        let secondRes = result.data.features[1].geometry.coordinates;
        let thirdRes = result.data.features[2].geometry.coordinates;
        let firstPolygon = [];
        let secondPolygon = [];
        let thirdPolygon = [];
        firstRes.map(data => {
          return data.map(latLng => {
            let realLatLng = latLng.reverse();
            firstPolygon = this.state.firstPolygon;
            return firstPolygon.push(realLatLng);
          });
        });
        secondRes.map(data => {
          return data.map(latLng => {
            let realLatLng = latLng.reverse();
            secondPolygon = this.state.secondPolygon;
            return secondPolygon.push(realLatLng);
          });
        });
        thirdRes.map(data => {
          return data.map(latLng => {
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

  render() {
    const defaultZoom = 11.4;
    const defaultPosition = [50.62925, 3.057256];
    const societyPosition = this.props.addressSociety;
    const societyIcon = L.icon({
      iconUrl: "./img/marker.png",
      iconSize: [30, 30]
    });
    const employeeIcon = L.icon({
      iconUrl: "./img/marker-icon-red.png",
      iconSize: [30, 30]
    });
    const firstPolygon = [this.state.firstPolygon];
    const secondPolygon = [this.state.secondPolygon];
    const thirdPolygon = [this.state.thirdPolygon];
    return (
      <div>
        <Container className="m-3">
          <NotificationAlert ref="notificationAlertError" />
          <h5>
            <img
              alt="step 1"
              src="https://img.icons8.com/metro/1600/3-circle.png"
              className="mr-2"
              width="50"
              height="50"
            />
            Analyse {this.props.title} {this.props.parameter} :
          </h5>
          <button className="btn text-white mt-4 mb-3" onClick={this.getLatLng}>
            <i className="fa fa-map-marker" /> Géolocaliser mes salariés
          </button>
          <button
            className="btn text-white mt-4 mb-3 ml-3"
            onClick={this.getIsochrone}
          >
            <i className="fa fa-map-o" /> Afficher la cartographie isochrone{" "}
            <em>(cf. légende)</em>
          </button>
          <Row>
            <Col md={{ size: 12 }} className="ml-5">
              {societyPosition.length === 0 ? (
                <Map center={defaultPosition} zoom={defaultZoom}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  />
                </Map>
              ) : (
                <Map center={societyPosition} zoom={this.props.zoom}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={societyPosition} icon={societyIcon}>
                    <Popup>
                      <span>Société</span>
                    </Popup>
                  </Marker>
                  {this.state.mapData.map(data => {
                    return (
                      <Marker
                        position={data.marker}
                        key={data.marker}
                        icon={employeeIcon}
                      />
                    );
                  })}
                  <Polygon positions={firstPolygon} color="blue" />
                  <Polygon positions={secondPolygon} color="red" />
                  <Polygon positions={thirdPolygon} color="yellow" />
                </Map>
              )}
            </Col>
          </Row>
        </Container>
        <Container className="mt-3">
          <Row>
            <Col lg={{ size: 4 }}>
              <div className="legend mr-lg-4">
                <legend>Légende</legend>
                <ul className="list-unstyled">
                  <li>
                    <img
                      src="./img/marker.png"
                      alt="societyMarker"
                      width="30"
                      height="30"
                      className="mb-2"
                    />
                    Entreprise
                  </li>
                  <li>
                    <img
                      src="./img/marker-icon-red.png"
                      alt="employeeMarker"
                      width="30"
                      height="30"
                    />
                    Salariés
                  </li>
                </ul>
                <b>
                  {this.props.distance} {this.props.parameter} :
                </b>
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
                {this.props.parameter === "en voiture" ? (
                  <GeoStatistics
                    employeePositions={this.state.mapData}
                    societyPosition={societyPosition}
                    measure="km"
                    profile="driving-car"
                    parameter="en voiture"
                    title="Distance"
                    glyphicon="fa fa-car"
                  />
                ) : (
                  ""
                )}
                {this.props.parameter === "à vélo" ? (
                  <GeoStatistics
                    employeePositions={this.state.mapData}
                    societyPosition={societyPosition}
                    measure="minutes"
                    profile="cycling-regular"
                    parameter="à vélo"
                    title="Temps de trajet"
                    glyphicon="fa fa-bicycle"
                  />
                ) : (
                  ""
                )}
                {this.props.parameter === "à pieds" ? (
                  <GeoStatistics
                    employeePositions={this.state.mapData}
                    societyPosition={societyPosition}
                    measure="minutes"
                    profile="foot-walking"
                    parameter="à pieds"
                    title="Temps de trajet"
                    glyphicon="fa fa-street-view"
                  />
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default APIGeoloc;
