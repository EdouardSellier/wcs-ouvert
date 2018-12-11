import React, { Component } from "react";
import "./css/Geolocalisation.css";
import { Container, Row, Col } from "reactstrap";
import { Map, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import GeoStatistics from "./GeoStatistics";
import L from "leaflet";

const defaultPosition = [50.62925, 3.057256];

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
    this.getIsochrone();
  };

  getIsochrone = () => {
    //let center = this.props.addressSociety.reverse();
    let center = defaultPosition.reverse();
    axios
      .get(
        `https://api.openrouteservice.org/isochrones?api_key=5b3ce3597851110001cf624884e9b90603e34a1bba9744ae0c73fd0a&locations=${center}&profile=driving-car&range_type=distance&range=5000,10000,20000`
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
    const firstPolygon = [this.state.firstPolygon];
    const secondPolygon = [this.state.secondPolygon];
    const thirdPolygon = [this.state.thirdPolygon];
    const myIcon = L.icon({
      iconUrl: "https://img.icons8.com/metro/1600/marker.png",
      iconSize: [38, 38]
    });
    const societyPosition = this.props.addressSociety;
    const societyPositionReverse = this.props.addressSociety.reverse();
    const zoom = 11.4;
    return (
      <div>
        <Container className="mt-3">
          <button className="btn text-white mt-4 mb-3" onClick={this.getLatLng}>
            Géolocaliser mes salariés
          </button>
          {societyPosition.length === 0 ? (
            <Map center={defaultPosition} zoom={zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
            </Map>
          ) : (
            <Map center={defaultPosition} zoom={zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              <Polygon positions={firstPolygon} color="blue" />
              <Polygon positions={secondPolygon} color="red" />
              <Polygon positions={thirdPolygon} color="yellow" />
              <Marker position={defaultPosition} icon={myIcon}>
                <Popup>
                  <span>Société</span>
                </Popup>
              </Marker>
              {this.state.mapData.map(data => {
                return <Marker position={data.marker} key={data.marker} />;
              })}
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
                    Société
                  </li>
                  <li>
                    <img
                      src="http://www.association-sauvy.fr/leaflet/marker-icon-bluec.png"
                      alt="employeeMarker"
                      width="22"
                      height="28"
                      className="ml-2 mr-2"
                    />
                    Employés
                  </li>
                </ul>
                <b>Temps de trajet en voiture :</b>
                <ul className="list-unstyled">
                  <li>
                    <span className="bluePolygon mr-3">=====</span>Inférieur à
                    10km
                  </li>
                  <li>
                    <span className="redPolygon mr-3">=====</span>Entre 10 et
                    20km
                  </li>
                  <li>
                    <span className="yellowPolygon mr-3">=====</span>Supérieur à
                    20km
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={{ size: 8 }}>
              <div className="card">
                <GeoStatistics
                  employeePositions={this.state.mapData}
                  societyPosition={societyPositionReverse}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default APIGeoloc;
