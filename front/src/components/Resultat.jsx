import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/Resultat.css";

class Resultat extends Component {
  render() {
    <div className="container-fluid mt-2">
      <Row>
        <Col lg={{ size: 2 }}>
          <button className="mt-2 btn text-white" onClick={this.handleSubmit}>
            Revenir à l'accueil
          </button>
        </Col>
        <Col lg={{ size: 8 }}>
          <h3>Consulter les résultats de mon enquête</h3>
        </Col>
      </Row>
    </div>;
  }
}

export default Resultat;
