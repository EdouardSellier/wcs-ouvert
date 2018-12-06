import React, { Component } from "react";
import Footer from "./Footer";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class ListeEnquetesRH extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <hr />
        <Container className="mt-4">
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
              <h3>Consulter mes enquêtes en cours</h3>
            </Col>
          </Row>
        </Container>
        <Container className="mt-4">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga,
            sequi nobis et fugiat ullam saepe error. Laborum sit eligendi, quas
            asperiores quod in iusto reiciendis voluptatum accusamus id, veniam
            sunt.
          </p>
          <select>
            <option>Sélectionner une enquête</option>
            <option>Enquête n°1 pour le site de Lille</option>
            <option>Enquête n°2 pour le site de Reims</option>
            <option>Enquête n°3 pour le site de Paris</option>
          </select>
        </Container>
        <Container className="mt-4 mb-4">
          <h5>Que souhaitez-vous faire pour cette enquête ?</h5>
          <Row className="justify-content-between mt-4">
            <Col lg={{ size: 3 }}>
              <div className="card">
                <div className="card-header">Consulter le sondage</div>
                <div className="card-body">
                  <Link to="/sondage">
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
                <div className="card-header">Consulter les résultats</div>
                <div className="card-body">
                  <Link to="/resultat">
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
                <div className="card-header">Demander de l'assistance</div>
                <div className="card-body">
                  <Link to="/assistance">
                    <img
                      src="http://cdn.onlinewebfonts.com/svg/img_571111.png"
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
        <Footer />
      </div>
    );
  }
}

export default ListeEnquetesRH;
