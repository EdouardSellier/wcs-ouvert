import React, { Component } from "react";
import Header from "./Header";
import Inscription from "./Inscription";
import Connexion from "./Connexion";
import Contact from "./Contact";
import "./css/Accueil.css";
import { Row, Col } from "reactstrap";
import ScrollAnimation from "react-animate-on-scroll";
import Zoom from "react-reveal/Zoom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getInscription: false,
      getConnexion: true,
      inscriptionButtonColor: "#38909d",
      connexionButtonColor: "grey"
    };
  }

  getInscription = () => {
    this.setState({
      getInscription: true,
      getConnexion: false,
      connexionButtonColor: "#38909d",
      inscriptionButtonColor: "grey"
    });
  };

  getConnexion = () => {
    this.setState({
      getInscription: false,
      getConnexion: true,
      connexionButtonColor: "grey",
      inscriptionButtonColor: "#38909d"
    });
  };

  render() {
    const inscriptionButtonStyle = {
      backgroundColor: this.state.inscriptionButtonColor
    };
    const connexionButtonStyle = {
      backgroundColor: this.state.connexionButtonColor
    };
    return (
      <div className="home">
        <Header />
        <div className="">
          <div className="centered">
            <Zoom>
              BIENVENUE SUR NOTRE OUTIL
              <br /> DE PLAN DE MOBILITÉ !
            </Zoom>
          </div>
        </div>
        <div className="m-4">
          <Row>
            <Col lg={{ size: 4 }}>
              <ScrollAnimation animateIn="fadeIn">
                <div className="card homeCard">
                  <div className="card-header">
                    <h4>OUVERT, bureau d’écolonomie </h4>
                  </div>
                  <div className="card-body">
                    OUVERT vous accompagne dans la mise en œuvre de votre plan
                    de mobilité. Cliquez ici pour en savoir plus sur notre
                    accompagnement.
                  </div>
                </div>
              </ScrollAnimation>
            </Col>
            <Col lg={{ size: 4 }}>
              <ScrollAnimation animateIn="fadeIn">
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
              </ScrollAnimation>
            </Col>
            <Col lg={{ size: 4 }}>
              <ScrollAnimation animateIn="fadeIn">
                <div className="card homeCard">
                  <div className="card-header">
                    <h4>Démarche d’inscription</h4>
                  </div>
                  <div className="card-body">
                    En 3 clics, les premières étapes de votre PDM sont réalisées
                    ! Pour en savoir plus sur nos services et les modalités
                    d’inscription, cliquez ici.
                  </div>
                </div>
              </ScrollAnimation>
            </Col>
          </Row>
        </div>
        <hr id="inscription" className="p-3" />
        <ScrollAnimation animateIn="fadeIn">
          <Col lg={{ size: 4, offset: 4 }}>
            <div>
              <button
                style={inscriptionButtonStyle}
                className="btn text-white mt-5 mr-2"
                onClick={this.getInscription}
              >
                <i className="fa fa-address-card" /> Inscription
              </button>
              <button
                style={connexionButtonStyle}
                className="btn text-white mt-5"
                onClick={this.getConnexion}
              >
                <i className="fa fa-user" /> Connexion
              </button>
            </div>
          </Col>
          {this.state.getInscription === true &&
          this.state.getConnexion === false ? (
            <div>
              <Inscription />
            </div>
          ) : (
            <div>
              <Connexion />
            </div>
          )}
        </ScrollAnimation>
        <hr id="contact" className="p-3" />
        <ScrollAnimation animateIn="fadeIn">
          <div className="mt-5 pb-5">
            <Contact />
          </div>
        </ScrollAnimation>
      </div>
    );
  }
}

export default Home;
