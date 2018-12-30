import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/Assistance.css";

class Assistance extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };
  render() {
    return (
      <div>
        <div className="assistance">
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
                <h3>Assistance</h3>
              </Col>
            </Row>
          </Container>
          <p className="m-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            eligendi dolor quaerat, perferendis repudiandae, quasi facilis
            cupiditate odit nesciunt eveniet optio laudantium quo? Tempora
            blanditiis neque, pariatur reprehenderit ipsam dicta!
          </p>
          <form method="post" action="" className="mt-3">
            <div className="form-group offset-3 col-md-6">
              <label>Adresse e-mail</label>
              <input
                type="email"
                className="form-control"
                id="inputEmailContact"
                placeholder="Adresse e-mail"
              />
            </div>
            <div className="form-group offset-3 col-md-6">
              <label>Votre message :</label>
              <textarea
                type="text"
                className="form-control"
                id="inputMessageContact"
                placeholder="Votre message..."
              />
            </div>
            <button type="submit" className="btn text-white mb-3">
              Envoyer ma demande
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Assistance;
