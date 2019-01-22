import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import "./css/EnqueteRH.css";
import { urlBackEnd } from "../conf";

const errorListSurvey = {
  place: "tr",
  message:
    "Nous n'avons pas réussi à récupérer la liste de vos enquêtes, nous vous invitons à contacter l'assistance. Merci de votre compréhension",
  type: "danger",
  autoDismiss: 4
};

const errorResult = {
  place: "tr",
  message:
    "Vous devez d'abord sélectionner une enquête avant de consulter les résultats.",
  type: "danger",
  autoDismiss: 4
};

class ListeEnquetesRH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSurveyName: [],
      surveyNameSelected: "",
      currentId: null
    };
  }

  alertFunctionErrorListSurvey = () => {
    this.refs.notificationAlertErrorList.notificationAlert(errorListSurvey);
  };

  alertFunctionErrorResult = () => {
    this.refs.notificationAlertErrorResult.notificationAlert(errorResult);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  changeSurveyName = event => {
    if (event.target.value !== "Sélectionner une enquête") {
      this.setState({
        surveyNameSelected: event.target.value
      });
    }
  };

  getSurveyName = () => {
    const token = localStorage.getItem("token");
    const currentId = Number(localStorage.getItem("currentId"));
    const body = {
      user_id: currentId
    };
    axios({
      method: "post",
      url: `${urlBackEnd}/user/list/survey`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        let allSurvey = this.state.allSurveyName;
        res.data.map(data => {
          return allSurvey.push(data.survey_name);
        });
        this.setState({
          allSurveyName: allSurvey,
          currentId: currentId
        });
      })
      .catch(error => {
        this.alertFunctionErrorListSurvey();
      });
  };

  getResult = () => {
    if (this.state.surveyNameSelected !== "") {
      this.props.history.push({
        pathname: "/resultat",
        state: {
          surveyNameSelected: this.state.surveyNameSelected,
          currentId: this.state.currentId
        }
      });
    } else {
      this.alertFunctionErrorResult();
    }
  };

  getAssistance = () => {
    this.props.history.push("/assistance");
  };

  componentDidMount = () => {
    this.getSurveyName();
  };

  render() {
    console.log(this.state.surveyNameSelected);
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
          <NotificationAlert ref="notificationAlertErrorList" />
          <NotificationAlert ref="notificationAlertErrorResult" />
          <Col lg={{ size: 6, offset: 3 }}>
            <select
              onChange={event => this.changeSurveyName(event)}
              className="form-control surveySelect"
            >
              <option>Sélectionner une enquête</option>
              {this.state.allSurveyName.map(survey => {
                return <option key={survey}>{survey}</option>;
              })}
            </select>
          </Col>
        </Container>
        <Container className="mt-5 mb-4">
          <Row className="mt-5">
            <Col lg={{ size: 4, offset: 1 }}>
              <div
                className="card shadow mt-5 mb-4 clickCard"
                onClick={this.getResult}
              >
                <div className="card-body">
                  <img
                    src="./img/surveyResults.jpg"
                    alt="icon"
                    width="150"
                    height="150"
                    className="cardIcon mb-4"
                  />
                  <h4>Consulter les résultats</h4>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4, offset: 1 }}>
              <div
                className="card shadow mt-5 mb-4 clickCard"
                onClick={this.getAssistance}
              >
                <div className="card-body">
                  <img
                    src="./img/assistance.jpg"
                    alt="icon"
                    width="150"
                    height="150"
                    className="cardIcon mb-4"
                  />
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
