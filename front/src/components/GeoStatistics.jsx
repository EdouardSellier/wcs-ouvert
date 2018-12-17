import React, { Component } from "react";
import "./css/GeoStatistics.css";
import { Container } from "reactstrap";
import axios from "axios";
import NotificationAlert from "react-notification-alert";

const errorMsg = {
  place: "tr",
  message:
    "Nous avons rencontré un problème lors du chargement, merci de retenter dans quelques minutes ou de contacter l'assistance",
  type: "danger",
  autoDismiss: 4
};

class GeoStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsKm: [],
      statsMin: [],
      average: 0,
      min: 0,
      max: 0,
      nbPersUnder5: 0,
      nbPers5To10: 0,
      nbPers10To20: 0,
      nbPersOver15: 0,
      nbPersOver20: 0
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  getDistance = () => {
    const latLng = this.props.employeePositions;
    const societyPosition = this.props.societyPosition;
    latLng.map(data => {
      let employeeLatLng = data.marker.reverse();
      let query = `${societyPosition}|${employeeLatLng}`;
      return axios({
        method: "get",
        url: `https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf624884e9b90603e34a1bba9744ae0c73fd0a&coordinates=${query}
          &profile=${this.props.profile}&units=km&language=fr`
      })
        .then(res => {
          let distances = this.state.statsKm;
          let durations = this.state.statsMin;
          let distanceKm = res.data.routes[0].summary.distance;
          let distanceSec = res.data.routes[0].summary.duration;
          let distanceMin = distanceSec / 60;
          distances.push(distanceKm);
          durations.push(Math.round(distanceMin));
          if (this.props.parameter === "en voiture") {
            let sum = distances.reduce((a, b) => a + b, 0);
            let averageKm = sum / distances.length;
            let min = Math.min(...distances);
            let max = Math.max(...distances);
            this.setState(
              {
                statsKm: distances,
                average: averageKm.toFixed(1),
                min: min.toFixed(1),
                max: max.toFixed(1)
              },
              () => {
                this.getStatistics();
              }
            );
          } else {
            let sum = durations.reduce((a, b) => a + b, 0);
            let average = Math.round(sum / durations.length);
            let min = Math.min(...durations);
            let max = Math.max(...durations);
            this.setState(
              {
                statsMin: durations,
                average: average,
                min: min,
                max: max
              },
              () => {
                this.getStatistics();
              }
            );
          }
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
      allDistances.map(data => {
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
      return this.setState({
        nbPersUnder5: countPersUnder5,
        nbPers5To10: countPers5To10,
        nbPers10To20: countPers10To20,
        nbPersOver20: countPersOver20
      });
    } else {
      allDurations.map(data => {
        if (data <= 5) {
          countPersUnder5 = countPersUnder5 + 1;
        }
        if (data > 5 && data <= 10) {
          countPers5To10 = countPers5To10 + 1;
        }
        if (data > 10 && data <= 15) {
          countPers10To15 = countPers10To15 + 1;
        }
        if (data > 15) {
          countPersOver15 = countPersOver15 + 1;
        }
      });
      return this.setState({
        nbPersUnder5: countPersUnder5,
        nbPers5To10: countPers5To10,
        nbPers10To15: countPers10To15,
        nbPersOver15: countPersOver15
      });
    }
  };

  render() {
    return (
      <div>
        <div className="cardBody">
          <NotificationAlert ref="notificationAlertError" />
          <button className="btn text-white m-3" onClick={this.getDistance}>
            <i className={this.props.glyphicon} /> Analyser les trajets{" "}
            {this.props.parameter}
          </button>
          <Container className="statistics ml-lg-5">
            <p>
              {this.props.title} domicile-lieu de travail en moyenne :
              <br />
              <span className="stats">
                {this.state.average} {this.props.measure}
              </span>
            </p>
            <p>
              {this.props.title} domicile-lieu de travail minimale :
              <br />
              <span className="stats">
                {this.state.min} {this.props.measure}
              </span>
            </p>
            <p>
              {this.props.title} domicile-lieu de travail maximale :
              <br />
              <span className="stats">
                {this.state.max} {this.props.measure}
              </span>
            </p>
            <br />
            <p>
              Sur les {this.props.employeePositions.length} salariés
              géolocalisés :
            </p>
            <ul>
              <li>
                {this.state.nbPersUnder5} salarié
                {this.state.nbPersUnder5 > 1 ? "s" : ""} habite
                {this.state.nbPersUnder5 > 1 ? "nt" : ""} à moins de 5
                {this.props.measure === "km" ? " km " : " minutes "}
                {this.props.parameter} de l'entreprise.
              </li>
              <li>
                {this.state.nbPers5To10} salarié
                {this.state.nbPers5To10 > 1 ? "s" : ""} habite
                {this.state.nbPers5To10 > 1 ? "nt" : ""} entre 5 et 10
                {this.props.measure === "km" ? " km " : " minutes "}
                {this.props.parameter} de l'entreprise.
              </li>
              <li>
                {this.props.parameter === "en voiture"
                  ? this.state.nbPers10To20
                  : this.state.nbPers10To15}{" "}
                salarié
                {this.state.nbPers10To20 > 1 || this.state.nbPers10To15 > 1
                  ? "s"
                  : ""}{" "}
                habite
                {this.state.nbPers10To20 > 1 || this.state.nbPers10To15 > 1
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
                {this.state.nbPersOver20 > 1 || this.state.nbPersOver15 > 1
                  ? "s"
                  : ""}{" "}
                habite
                {this.state.nbPersOver20 > 1 || this.state.nbPersOver15 > 1
                  ? "nt"
                  : ""}{" "}
                à plus de
                {this.props.measure === "km" ? " 20 km " : " 15 minutes "}
                {this.props.parameter} de l'entreprise.
              </li>
            </ul>
          </Container>
        </div>
      </div>
    );
  }
}

export default GeoStatistics;
