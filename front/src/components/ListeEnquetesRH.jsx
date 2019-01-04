import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/ListeEnquetesRH.css";

class ListeEnquetesRH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSurveyName: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  getSurveyName = () => {
    axios
      .get("http://localhost:8080/rh/list/survey")
      .then(res => {
        this.setState({
          allSurveyName: res.data
        });
      })
      .catch(error => {
        console.log("Fail: " + error);
      });
  };

  componentDidMount = () => {
    this.getSurveyName();
  };

  render() {
    return (
      <div>
        <hr />
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
              <h3>Consulter mes enquêtes en cours</h3>
            </Col>
          </Row>
        </Container>
        <Container className="mt-4">
          <p>
            Ici, vous pouvez sélectionner une enquête et consulter les résultats
            ou connaître le taux de participation si elle n'est pas encore
            terminée.
          </p>
          <Col lg={{ size: 6, offset: 3 }}>
            <select className="form-control">
              <option>Sélectionner une enquête</option>
              {this.state.allSurveyName.map(survey => {
                return (
                  <option key={survey.survey_name}>{survey.survey_name}</option>
                );
              })}
            </select>
          </Col>
        </Container>
        <Container className="mt-4 mb-4">
          <h5>Que souhaitez-vous faire pour cette enquête ?</h5>
          <Row className="mt-4">
            <Col lg={{ size: 5, offset: 1 }}>
              <div className="card">
                <div className="card-header">
                  <h5>Consulter les résultats</h5>
                </div>
                <div className="card-body">
                  <Link to="/resultat">
                    <img
                      src="./img/surveyResults.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                    />
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 5 }}>
              <div className="card">
                <div className="card-header">
                  <h5>Demander de l'assistance</h5>
                </div>
                <div className="card-body">
                  <Link to="/assistance">
                    <img
                      src="./img/assistance.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                    />
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

export default ListeEnquetesRH;
