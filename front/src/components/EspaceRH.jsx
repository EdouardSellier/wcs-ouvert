import React, { Component } from "react";
import "./css/EspaceRH.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class EspaceRH extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="espaceRh">
        <hr />
        <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2 }}>
              <h3 className="mt-2">Bienvenue sur votre espace</h3>
            </Col>
            <Col lg={{ size: 2 }}>
              <button
                className="mt-2 mb-5 btn btn-danger"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-power-off" /> Déconnexion
              </button>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5 mb-5">
          <Row className="justify-content-between">
            <Col lg={{ size: 4 }}>
              <div className="card card-default">
                <div className="card-header">
                  <h5>Créer et diffuser une enquête</h5>
                </div>
                <div className="card-body">
                  <Link to="/nouvelleenquete">
                    <img
                      src="./img/createSurvey.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                    />
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4 }}>
              <div className="card">
                <div className="card-header">
                  <h5>Suivre les enquêtes en cours</h5>
                </div>
                <div className="card-body">
                  <Link to="/listeenquetesrh">
                    <img
                      src="./img/surveyInProgress.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                    />
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4 }}>
              <div className="card">
                <div className="card-header">
                  <h5>Géolocaliser les salariés</h5>
                </div>
                <div className="card-body">
                  <Link to="/geolocalisation">
                    <img
                      src="./img/geoloc.jpg"
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

export default EspaceRH;
