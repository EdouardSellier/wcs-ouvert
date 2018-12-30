import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./css/EspaceAdmin.css";

class AccueilAdmin extends Component {
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
                <i className="fa fa-power-off" /> Déconnexion
              </button>
            </Col>
          </Row>
        </Container>
        <hr />
        <Container className="espaceAdmin">
          <h3 className="m-3">Mon espace administrateur</h3>
          <Row>
            <Col lg={{ size: 4, offset: 2 }} className="mt-5">
              <div className="card">
                <div className="card-header">
                  Consulter la liste des entreprises inscrites
                </div>
                <div className="card-body">
                  <Link to="/listeentreprises">
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
            <Col lg={{ size: 4 }} className="mt-5">
              <div className="card">
                <div className="card-header">
                  Consulter le nombre d'enquêtes en cours
                </div>
                <div className="card-body">
                  <Link to="/listeenquetes">
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
          </Row>
        </Container>
      </div>
    );
  }
}

export default AccueilAdmin;
