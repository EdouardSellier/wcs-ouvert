import React, { Component } from "react";
import Footer from "./Footer";
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
      <div>
        <Container>
          <Row>
            <Col lg={{ size: 8, offset: 2 }}>
              <p className="homeSlogan">
                MOUV'R : Enquête de mobilité pour vos salariés
              </p>
            </Col>
            <Col lg={{ size: 2 }}>
              <button
                className="mt-2 btn btn-danger"
                onClick={this.handleSubmit}
              >
                Déconnexion
              </button>
            </Col>
          </Row>
        </Container>
        <hr />
        <h3>Mon Espace</h3>
        <Container className="espaceRH mt-5">
          <Row>
            <p className="text-justify ml-5 mr-5">
              Lorem ipsum sit amet dolor lorem ipsum sit amet dolor, lorem ipsum
              sit amet dolor Lorem ipsum sit amet dolor lorem ipsum sit amet
              dolor, lorem ipsum sit amet dolor Lorem ipsum sit amet dolor lorem
              ipsum sit amet dolor, lorem ipsum sit amet dolor Lorem ipsum sit
              amet dolor lorem ipsum sit amet dolor, lorem ipsum sit amet dolor.
            </p>
          </Row>
        </Container>
        <Container className="mt-5 mb-5">
          <Row className="justify-content-between">
            <Col lg={{ size: 3 }}>
              <div className="card">
                <div className="card-header">Nouvelle enquête</div>
                <div className="card-body">
                  <Link to="/nouvelleenquete">
                    <img
                      src="https://image.freepik.com/iconen-gratis/het-invoeren-van-tekst-op-browser-cirkelsymbool_318-57678.jpg"
                      alt="icon"
                      width="180"
                      height="180"
                    />
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 3 }}>
              <div className="card">
                <div className="card-header">Mes enquêtes en cours</div>
                <div className="card-body">
                  <Link to="/listeenquetesrh">
                    <img
                      src="https://static.thenounproject.com/png/580745-200.png"
                      alt="icon"
                      width="170"
                      height="170"
                    />
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 3 }}>
              <div className="card">
                <div className="card-header">Géolocaliser mes salariés</div>
                <div className="card-body">
                  <Link to="/geolocalisation">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/39/Simpleicons_Places_map-with-placeholder.svg"
                      alt="icon"
                      width="180"
                      height="180"
                    />
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={{ size: 3 }}>
              <div className="card">
                <div className="card-header">Assistance</div>
                <div className="card-body">
                  <Link to="/assistance">
                    <img
                      src="http://cdn.onlinewebfonts.com/svg/img_571111.png"
                      alt="icon"
                      width="170"
                      height="170"
                    />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default EspaceRH;
