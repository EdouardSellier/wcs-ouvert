import React, { Component } from "react";
import "./css/EspaceRH.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Zoom from "react-reveal/Zoom";

class EspaceRH extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="espaceRh ">
        <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2 }}>
              <Zoom>
                <h1 className="mt-2 text-white">
                  <b>Bienvenue sur votre espace</b>
                </h1>
              </Zoom>
            </Col>
            <Col lg={{ size: 2 }}>
              <button
                className="mt-3 mb-5 btn btn-danger"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-power-off" /> Déconnexion
              </button>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <Row className="justify-content-between">
            <Col lg={{ size: 4 }}>
              <div className="card shadow mt-5 rhCard">
                <div className="card-body">
                  <Link to="/nouvelleenquete">
                    <img
                      src="./img/createSurvey.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                      className="cardIcon"
                    />
                  </Link>
                  <h4>Créer et diffuser une enquête</h4>
                  <p className="text-justify">
                    Depuis cette page, vous pouvez consulter et diffuser une
                    enquête pour mieux comprendre leurs habitudes de
                    déplacement. Cela vous permettra par la suite d’élaborer un
                    plan d’actions pertinent pour réduire la part d’utilisation
                    de la voiture individuelle dans les déplacements quotidiens
                    de vos salariés.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4 }}>
              <div className="card shadow mt-5 mb-4 rhCard">
                <div className="card-body">
                  <Link to="/listeenquetesrh">
                    <img
                      src="./img/surveyInProgress.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                      className="cardIcon"
                    />
                  </Link>
                  <h4>Suivre les enquêtes en cours</h4>
                  <p className="text-justify p-3">
                    Ici, vous pouvez sélectionner une enquête et consulter les
                    résultats ou connaître le taux de participation si elle
                    n'est pas encore terminée.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4 }}>
              <div className="card shadow mt-5 mb-4 rhCard">
                <div className="card-body">
                  <Link to="/geolocalisation">
                    <img
                      src="./img/geoloc.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                      className="cardIcon"
                    />
                  </Link>
                  <h4>Géolocaliser les salariés</h4>
                  <p className="text-justify">
                    Cette page vous permet de géolocaliser vos salariés. Grâce à
                    cela, vous connaîtrez entre autres la distance domicile –
                    travail moyenne que parcourent vos salariés, et la part
                    d’entre eux pouvant se rendre sur leur lieu de travail en
                    vélo. Pour géolocaliser vos salariés, il vous suffit de
                    suivre les étapes numérotées ci-dessous.
                  </p>
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
