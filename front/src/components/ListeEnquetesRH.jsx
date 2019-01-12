import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import "./css/EnqueteRH.css";

const errorMsg = {
  place: "tr",
  message:
    "Nous n'avons pas réussi à récupérer la liste de vos enquêtes, nous vous invitons à contacter l'assistance. Merci de votre compréhension",
  type: "danger",
  autoDismiss: 4
};

class ListeEnquetesRH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSurveyName: []
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  getSurveyName = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const body = { user_id: userId };
    axios({
      method: "post",
      url: "http://localhost:8080/user/list/survey",
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        this.setState({
          allSurveyName: res.data
        });
      })
      .catch(error => {
        this.alertFunctionError();
      });
  };

  componentDidMount = () => {
    this.getSurveyName();
  };

  render() {
    return (
      <div>
        <Container className="mt-4">
          <Row>
            <Col lg={{ size: 2 }}>
              <button
                className="mt-2 btn text-white"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-home" /> Revenir à l'accueil
              </button>
            </Col>
            <Col lg={{ size: 8 }}>
              <h1 className="text-white">
                <b>Consulter mes enquêtes en cours</b>
              </h1>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <NotificationAlert ref="notificationAlertError" />
          <Col lg={{ size: 6, offset: 3 }}>
            <select className="form-control surveySelect">
              <option>Sélectionner une enquête</option>
              {this.state.allSurveyName.map(survey => {
                return (
                  <option key={survey.survey_name}>{survey.survey_name}</option>
                );
              })}
            </select>
          </Col>
        </Container>
        <Container className="mt-5 mb-4">
          <Row className="mt-5">
            <Col lg={{ size: 4, offset: 1 }}>
              <div className="card shadow mt-5 mb-4">
                <div className="card-body">
                  <Link to="/resultat">
                    <img
                      src="./img/surveyResults.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                      className="cardIcon mb-4"
                    />
                  </Link>
                  <h4>Consulter les résultats</h4>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4, offset: 1 }}>
              <div className="card shadow mt-5 mb-4">
                <div className="card-body">
                  <Link to="/assistance">
                    <img
                      src="./img/assistance.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                      className="cardIcon mb-4"
                    />
                  </Link>
                  <h4>Demander de l'assistance</h4>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ListeEnquetesRH;
