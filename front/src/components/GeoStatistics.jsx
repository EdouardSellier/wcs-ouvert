import React, { Component } from "react";
import "./css/GeoStatistics.css";
import { Container } from "reactstrap";
import axios from "axios";

class GeoStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      average: 0,
      min: 0,
      max: 0,
      nbPersUnder5: 0,
      nbPers5To10: 0,
      nbPers10To20: 0,
      nbPersOver20: 0
    };
  }

  getDistance = () => {
    const latLng = this.props.employeePositions;
    const societyPosition = this.props.societyPosition;
    latLng.map(data => {
      let employeeLatLng = data.marker.reverse();
      let query = `${societyPosition}|${employeeLatLng}`;
      return axios({
        method: "get",
        url: `https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf624884e9b90603e34a1bba9744ae0c73fd0a&coordinates=${query}
          &profile=driving-car&units=km&language=fr`
      })
        .then(res => {
          let distances = this.state.stats;
          let distanceKm = res.data.routes[0].summary.distance;
          distances.push(distanceKm);
          let sum = distances.reduce((a, b) => a + b, 0);
          let averageKm = sum / distances.length;
          let min = Math.min(...distances);
          let max = Math.max(...distances);
          this.setState({
            stats: distances,
            average: averageKm.toFixed(1),
            min: min.toFixed(1),
            max: max.toFixed(1)
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  getStatistics = () => {
    let allDistances = this.state.stats;
    let countPersUnder5 = 0;
    let countPers5To10 = 0;
    let countPers10To20 = 0;
    let countPersOver20 = 0;
    allDistances.forEach(data => {
      if (data <= 5) {
        countPersUnder5 = countPersUnder5 + 1;
      }
      if (data > 5 && data <= 10) {
        countPers5To10 = countPers5To10 + 1;
      }
      if (data > 10 && data <= 20) {
        countPers10To20 = countPers10To20 + 1;
      }
      if (data > 20) {
        countPersOver20 = countPersOver20 + 1;
      }
    });
    this.setState({
      nbPersUnder5: countPersUnder5,
      nbPers5To10: countPers5To10,
      nbPers10To20: countPers10To20,
      nbPersOver20: countPersOver20
    });
  };

  componentDidMount = () => {
    this.getDistance();
    setInterval(() => {
      this.getStatistics();
    }, 1000);
  };

  componentWillMount() {
    clearInterval();
  }

  render() {
    return (
      <div>
        <div className="cardBody">
          <button
            className="btn text-white m-3"
            onClick={this.componentDidMount}
          >
            Lancer l'analyse
          </button>
          <Container className="statistics ml-lg-5">
            <p>
              Distance domicile-lieu de travail en moyenne :
              <br />
              <span>{this.state.average} km</span>
            </p>
            <p>
              Distance domicile-lieu de travail minimale :
              <br />
              <span>{this.state.min} km</span>
            </p>
            <p>
              Distance domicile-lieu de travail maximale :
              <br />
              <span>{this.state.max} km</span>
            </p>
            <br />
            <p>
              Sur les {this.props.employeePositions.length} employés
              géolocalisés :
            </p>
            <ul>
              <li>
                {this.state.nbPersUnder5} employé
                {this.state.nbPersUnder5 > 1 ? "s" : ""} habite
                {this.state.nbPersUnder5 > 1 ? "nt" : ""} à moins de 5 km de
                l'entreprise.
              </li>
              <li>
                {this.state.nbPers5To10} employé
                {this.state.nbPers5To10 > 1 ? "s" : ""} habite
                {this.state.nbPers5To10 > 1 ? "nt" : ""} entre 5 km et 10 km de
                l'entreprise.
              </li>
              <li>
                {this.state.nbPers10To20} employé
                {this.state.nbPers10To20 > 1 ? "s" : ""} habite
                {this.state.nbPers10To20 > 1 ? "nt" : ""} entre 10 km et 20 km
                de l'entreprise.
              </li>
              <li>
                {this.state.nbPersOver20} employé
                {this.state.nbPersOver20 > 1 ? "s" : ""} habite
                {this.state.nbPersOver20 > 1 ? "nt" : ""} à plus de 20 km de
                l'entreprise.
              </li>
            </ul>
          </Container>
        </div>
      </div>
    );
  }
}

export default GeoStatistics;
