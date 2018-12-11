import React, { Component } from "react";
import "./css/Geolocalisation.css";
import { Container, Row, Col } from "reactstrap";
import { Map, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import GeoStatistics from "./GeoStatistics";
import L from "leaflet";

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
          console.log(err);
        });
    });
  };

  getIsochrone = () => {
    let center = undefined;
    if (this.props.profile === "cycling-regular") {
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
        console.log(err);
      });
  };

  render() {
    const zoom = 11.4;
    const defaultPosition = [50.62925, 3.057256];
    const societyPosition = this.props.addressSociety;
    const myIcon = L.icon({
      iconUrl: "https://img.icons8.com/metro/1600/marker.png",
      iconSize: [38, 38]
    });
    const firstPolygon = [this.state.firstPolygon];
    const secondPolygon = [this.state.secondPolygon];
    const thirdPolygon = [this.state.thirdPolygon];
    return (
      <div>
        <Container className="mt-3">
          <h3>Analyse du temps de trajet en {this.props.parameter} :</h3>
          <button className="btn text-white mt-4 mb-3" onClick={this.getLatLng}>
            Géolocaliser mes salariés
          </button>
          <button
            className="btn text-white mt-4 mb-3 ml-3"
            onClick={this.getIsochrone}
          >
            Afficher la cartographie isochrone <em>(cf. légende)</em>
          </button>
          {societyPosition.length === 0 ? (
            <Map center={defaultPosition} zoom={zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
            </Map>
          ) : (
            <Map center={societyPosition} zoom={zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              <Marker position={societyPosition} icon={myIcon}>
                <Popup>
                  <span>Société</span>
                </Popup>
              </Marker>
              {this.state.mapData.map(data => {
                return <Marker position={data.marker} key={data.marker} />;
              })}
              <Polygon positions={firstPolygon} color="blue" />
              <Polygon positions={secondPolygon} color="red" />
              <Polygon positions={thirdPolygon} color="yellow" />
            </Map>
          )}
        </Container>
        <Container className="mt-3">
          <Row>
            <Col lg={{ size: 4 }}>
              <div className="legend mr-lg-4">
                <legend>Légende</legend>
                <ul className="list-unstyled">
                  <li>
                    <img
                      src="https://img.icons8.com/metro/1600/marker.png"
                      alt="societyMarker"
                      width="38"
                      height="30"
                      className="mb-2"
                    />
                    Entreprise
                  </li>
                  <li>
                    <img
                      src="http://www.association-sauvy.fr/leaflet/marker-icon-bluec.png"
                      alt="employeeMarker"
                      width="22"
                      height="28"
                      className="ml-2 mr-2"
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
              <div className="card">
                {this.props.measure === "km" ? (
                  <GeoStatistics
                    employeePositions={this.state.mapData}
                    societyPosition={societyPosition}
                    measure="km"
                    profile="driving-car"
                    parameter="voiture"
                    title="Distance"
                  />
                ) : (
                  <GeoStatistics
                    employeePositions={this.state.mapData}
                    societyPosition={societyPosition}
                    measure="minutes"
                    profile="cycling-regular"
                    parameter="vélo"
                    title="Temps de trajet"
                  />
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
