import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import Zoom from "react-reveal/Zoom";
import "./css/EspaceAdmin.css";

const errorMsg = {
  place: "tr",
  message: "Nous ne pouvons pas afficher les statistiques pour le moment.",
  type: "danger",
  autoDismiss: 4
};

class AccueilAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      societyList: 0,
      societyPaid: 0,
      societyNotPaid: 0,
      surveyList: 0,
      surveyFinished: 0,
      surveyNotFinished: 0,
      surveyArray: [],
      geolocationLength: 0
    };
  }

  handleSubmit = () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token", token);
    this.props.history.push("/");
  };

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  getSocietyStat = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/admin/list/society/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(result => {
        let nbSociety = result.data.length;
        let societyList = result.data;
        let societyOk = societyList.filter(society => {
          return society.has_paid === 1;
        });
        let societyNotPaid = societyList.filter(society => {
          return society.has_paid === 0;
        });
        this.setState({
          societyList: nbSociety,
          societyPaid: societyOk.length,
          societyNotPaid: societyNotPaid.length,
          surveyArray: societyList
        });
      })
      .catch(err => {
        this.alertFunctionError();
      });
  };

  getSurveyStat = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/admin/list/survey", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(result => {
        let nbSurvey = result.data.length;
        let surveyList = result.data;
        let today = new Date();
        let surveyFinished = surveyList.filter(survey => {
          let endingSurvey = new Date(survey.ending_date);
          return today >= endingSurvey;
        });
        let surveyNotFinished = surveyList.filter(survey => {
          let endingSurvey = new Date(survey.ending_date);
          return today <= endingSurvey;
        });
        this.setState({
          surveyList: nbSurvey,
          surveyFinished: surveyFinished.length,
          surveyNotFinished: surveyNotFinished.length
        });
      })
      .catch(err => {
        this.alertFunctionError();
      });
  };

  getGeolocationStat = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/admin/list/geolocation", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(result => {
        let geolocationList = result.data.length;
        this.setState({
          geolocationLength: geolocationList
        });
      })
      .catch(err => {
        this.alertFunctionError();
      });
  };

  componentDidMount = () => {
    this.getSocietyStat();
    this.getSurveyStat();
    this.getGeolocationStat();
  };

  render() {
    return (
      <div className="text-white">
        <NotificationAlert ref="notificationAlertError" />
        <Container className="mb-5 mt-3">
          <Row>
            <Col lg={{ size: 8, offset: 2 }}>
              <Zoom>
                <h1>
                  <b>Bienvenue sur votre espace administrateur</b>
                </h1>
              </Zoom>
            </Col>
            <Col lg={{ size: 2 }}>
              <button
                className="mt-2 btn btn-danger"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-power-off" /> Déconnexion
              </button>
            </Col>
          </Row>
        </Container>
        <Container className="espaceAdmin mb-4">
          <Row>
            <Col lg={{ size: 4 }} className="mt-5">
              <div className="card adminCard pt-2">
                <div className="card-header">
                  <h4>
                    <i className="fa fa-users" /> Inscriptions :{" "}
                    <b>{this.state.societyList}</b>
                  </h4>
                </div>
                <div className="card-body adminStat">
                  <p>
                    <span className="nbSociety">{this.state.societyPaid}</span>{" "}
                    entreprise
                    {this.state.societyPaid > 1
                      ? "s ont accès aux services du site."
                      : " a accès aux services du site"}
                    <br />
                    <span className="nbSociety">
                      {this.state.societyNotPaid}
                    </span>{" "}
                    entreprise
                    {this.state.societyNotPaid > 1
                      ? "s sont en attente de confirmation."
                      : " est en attente de confirmation."}
                  </p>
                  <Link to="/listeentreprises">
                    <button className="btn text-white mt-4 ml-5">
                      Consulter la liste des entreprises
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4 }} className="mt-5">
              <div className="card adminCard pt-2">
                <div className="card-header">
                  <h4>
                    <i className="fa fa-bar-chart" /> Enquêtes de mobilité :{" "}
                    <b>{this.state.surveyList}</b>
                  </h4>
                </div>
                <div className="card-body adminStat">
                  <p>
                    <span className="nbSociety">
                      {this.state.surveyFinished}
                    </span>{" "}
                    enquête
                    {this.state.surveyFinished > 1
                      ? "s terminées."
                      : " terminée."}{" "}
                    <br />
                    <span className="nbSociety">
                      {this.state.surveyNotFinished}
                    </span>{" "}
                    enquête
                    {this.state.surveyNotFinished > 1
                      ? "s en cours."
                      : " en cours."}{" "}
                  </p>
                  <Link to="/listeenquetes">
                    <button className="btn text-white mt-5 ml-5">
                      Consulter la liste des enquêtes
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4 }} className="mt-5">
              <div className="card adminCard pt-2">
                <div className="card-header">
                  <h4>
                    <i className="fa fa-map" /> Géolocalisations :{" "}
                    <b>{this.state.geolocationLength}</b>
                  </h4>
                </div>
                <div className="card-body adminStat">
                  <p>
                    Vous pouvez retrouver sur cette page les coordonnées GPS et
                    les adresses du lieu de travail et des salariés renseignés
                    lors de la géolocalisation et les exporter sous format CSV.
                  </p>
                  <Link to="/listegeoloc">
                    <button className="btn text-white mt-4 ml-3">
                      Consulter la liste des géolocalisations
                    </button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AccueilAdmin;
