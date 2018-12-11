import React, { Component } from "react";
import Footer from "./Footer";
import { Container, Row, Col } from "reactstrap";
import "./css/Resultat.css";

class Resultat extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };
  render() {
    return (
      <div>
        <div className="resultat">
          <p className="homeSlogan">
            MOUV'R : Enquête de mobilité pour vos salariés
          </p>
          <hr />
          <Container className="mt-2">
            <Row>
              <Col lg={{ size: 2 }}>
                <button
                  className="mt-2 btn text-white"
                  onClick={this.handleSubmit}
                >
                  Revenir à l'accueil
                </button>
              </Col>
              <Col lg={{ size: 8 }}>
                <h3>Consulter les résultats de mon enquête</h3>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Resultat;
