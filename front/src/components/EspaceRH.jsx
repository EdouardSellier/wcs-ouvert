import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Zoom from "react-reveal/Zoom";
import "./css/EspaceRH.css";

class EspaceRH extends Component {
  handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("has_paid");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentId");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="pageHeight">
        <Container>
          <Row>
            <Col xs={{ size: 8, offset: 2 }}>
              <Zoom>
                <h1 className="mt-2 text-white">
                  <b>Bienvenue sur votre espace</b>
                </h1>
              </Zoom>
            </Col>
            <Col lg={{ size: 2 }}>
              <button
                className="mt-3 mb-5 btn btn-danger"
                onClick={this.handleLogOut}
              >
                <i className="fa fa-power-off" /> Déconnexion
              </button>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <Row className="justify-content-between">
            <Col lg={{ size: 4, offset: 0 }} sm={{ size: 8, offset: 2 }}>
              <Link to="/nouvelleenquete" className="linkTo">
                <div className="card shadow mt-5 rhCard">
                  <div className="card-body">
                    <img
                      src="./img/createSurvey.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                      className="cardIcon"
                    />
                    <h4>Créer et diffuser une enquête</h4>
                    <p className="text-justify">
                      Depuis cette page, vous pouvez diffuser auprès de vos
                      salariés une enquête permettant de mieux comprendre leurs
                      habitudes de déplacement. Cela vous aidera par la suite à
                      proposer des solutions d’alternatives à l’utilisation de
                      la voiture individuelle pertinentes pour les déplacements
                      quotidiens de vos salariés.
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col
              lg={{ size: 4, offset: 0 }}
              sm={{ size: 8, offset: 2 }}
              className="mt-5 mt-lg-1"
            >
              <Link to="/listeenquetesrh" className="linkTo">
                <div className="card shadow mt-5 mb-4 rhCard">
                  <div className="card-body">
                    <img
                      src="./img/surveyInProgress.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                      className="cardIcon"
                    />
                    <h4>Suivre les enquêtes en cours</h4>
                    <p className="text-justify p-3">
                      Ici, sélectionnez parmi les enquêtes que vous avez créées
                      celle dont vous voulez consulter les résultats. Si
                      l’enquête n’a pas pris fin, vous serez alors informé du
                      taux de participation.
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col
              lg={{ size: 4, offset: 0 }}
              sm={{ size: 8, offset: 2 }}
              className="mt-md-5 mt-3 mt-lg-1"
            >
              <Link to="/geolocalisation" className="linkTo">
                <div className="card shadow mt-5 mb-5 rhCard">
                  <div className="card-body">
                    <img
                      src="./img/geoloc.jpg"
                      alt="icon"
                      width="150"
                      height="150"
                      className="cardIcon"
                    />
                    <h4>Géolocaliser les salariés</h4>
                    <p className="text-justify">
                      Cette page vous permet de géolocaliser vos salariés. Grâce
                      à cela, vous connaîtrez entre autres la distance domicile
                      – travail moyenne que parcourent vos salariés, et la part
                      d’entre eux pouvant se rendre sur leur lieu de travail en
                      vélo. Pour géolocaliser vos salariés, il vous suffit de
                      suivre les étapes numérotées ci-dessous.
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EspaceRH;
