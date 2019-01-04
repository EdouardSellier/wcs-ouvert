import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "./Header";
import "./css/Accueil.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="backgroundImage">
          <img
            src="./img/background.jpg"
            alt="homeImage"
            className="img-fluid homeImage"
          />
        </div>
        <Container className="mt-4 mb-4">
          <Row>
            <Col lg={{ size: 4 }}>
              <div className="card homeCard">
                <div className="card-header">
                  <h4>OUVERT, bureau d’écolonomie </h4>
                </div>
                <div className="card-body">
                  OUVERT vous accompagne dans la mise en œuvre de votre plan de
                  mobilité. Cliquez ici pour en savoir plus sur notre
                  accompagnement.
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4 }}>
              <div className="card homeCard">
                <div className="card-header">
                  <h4>Le Plan de Mobilité (PDM)</h4>
                </div>
                <div className="card-body">
                  Le Plan de Mobilité est une étude visant à réduire la part
                  d’utilisation de la voiture individuelle dans le cadre des
                  déplacements professionnels et des déplacements domicile –
                  travail. Cliquez ici pour en savoir plus sur la démarche.
                </div>
              </div>
            </Col>
            <Col lg={{ size: 4 }}>
              <div className="card homeCard">
                <div className="card-header">
                  <h4>Démarche d’inscription</h4>
                </div>
                <div className="card-body">
                  En 3 clics, les premières étapes de votre PDM sont réalisées !
                  Pour en savoir plus sur nos services et les modalités
                  d’inscription, cliquez ici.
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
