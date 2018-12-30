import React, { Component } from "react";
import "./css/ListeEntreprises.css";
import { Container, Row, Col } from "reactstrap";

class ListeEntreprises extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
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
      </div>
    );
  }
}

export default ListeEntreprises;
