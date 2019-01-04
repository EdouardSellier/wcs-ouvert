import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./css/EspaceAdmin.css";
import axios from "axios";
import NotificationAlert from "react-notification-alert";

const errorMsg = {
  place: "tr",
  message: "Nous ne pouvons pas afficher les statistiques.",
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
      surveyArray: []
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  getSocietyStat = () => {
    axios
      .get("http://localhost:8080/admin/list/society")
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
    axios
      .get("http://localhost:8080/admin/list/survey")
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
  componentDidMount = () => {
    this.getSocietyStat();
    this.getSurveyStat();
  };

  render() {
    return (
      <div>
        <hr />
        <NotificationAlert ref="notificationAlertError" />
        <Container className="mb-5">
          <Row>
            <Col lg={{ size: 8, offset: 2 }}>
              <h2>Bienvenue sur votre espace administrateur</h2>
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
            <Col lg={{ size: 5, offset: 1 }} className="mt-5">
              <div className="card">
                <div className="card-header">
                  <h4>
                    <i className="fa fa-users" /> Inscriptions :{" "}
                    {this.state.societyList}
                  </h4>
                </div>
                <div className="card-body p-5 adminStat">
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
                  <Col lg={{ size: 10, offset: 1 }}>
                    <Link to="/listeentreprises">
                      <button className="btn text-white m-3">
                        Consulter la liste des entreprises
                      </button>
                    </Link>
                  </Col>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 5 }} className="mt-5">
              <div className="card">
                <div className="card-header">
                  <h4>
                    <i className="fa fa-bar-chart" /> Enquêtes de mobilité :{" "}
                    {this.state.surveyList}{" "}
                  </h4>
                </div>
                <div className="card-body p-5 adminStat">
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
                  <Col lg={{ size: 10, offset: 1 }}>
                    <Link to="/listeenquetes">
                      <button className="btn text-white m-3">
                        Consulter la liste des enquêtes
                      </button>
                    </Link>
                  </Col>
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
