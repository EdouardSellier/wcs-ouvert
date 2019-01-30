import React, { Component } from "react";
import Header from "./Header";
import Inscription from "./Inscription";
import Connexion from "./Connexion";
import Contact from "./Contact";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import ScrollAnimation from "react-animate-on-scroll";
import Zoom from "react-reveal/Zoom";
import "./css/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getInscription: false,
      getConnexion: true,
      inscriptionButtonColor: "#38909d",
      connexionButtonColor: "grey",
      modalDescription: false,
      modalPDM: false,
      modalInscription: false
    };
  }

  toggleDescription = () => {
    this.setState({
      modalDescription: !this.state.modalDescription
    });
  };

  togglePDM = () => {
    this.setState({
      modalPDM: !this.state.modalPDM
    });
  };

  toggleInscription = () => {
    this.setState({
      modalInscription: !this.state.modalInscription
    });
  };

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
    const closeBtnDescription = (
      <button className="close" onClick={this.toggleDescription}>
        &times;
      </button>
    );
    const closeBtnPDM = (
      <button className="close" onClick={this.togglePDM}>
        &times;
      </button>
    );
    const closeBtnInscription = (
      <button className="close" onClick={this.toggleInscription}>
        &times;
      </button>
    );
    const inscriptionButtonStyle = {
      backgroundColor: this.state.inscriptionButtonColor
    };
    const connexionButtonStyle = {
      backgroundColor: this.state.connexionButtonColor
    };
    return (
      <div className="home">
        <Header />
        <div>
          <div className="centered">
            <Zoom>BIENVENUE SUR NOTRE OUTIL DE PLAN DE MOBILITÉ !</Zoom>
            <img src="./img/Image1.png" alt="cook" className="mt-5 img-fluid" />
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
                  <div className="card-body pt-4">
                    OUVERT vous accompagne dans la mise en œuvre de votre plan
                    de mobilité.
                    <button
                      className="toggleButton"
                      onClick={this.toggleDescription}
                    >
                      Cliquez ici
                    </button>
                    pour en savoir plus sur notre accompagnement.
                  </div>
                  <Modal
                    isOpen={this.state.modalDescription}
                    toggle={this.toggleDescription}
                    className="modal-lg"
                  >
                    <ModalHeader close={closeBtnDescription}>
                      <b className="modalHeader">OUVERT Bureau d'Ecolonomie</b>
                    </ModalHeader>
                    <ModalBody className="p-4 text-justify">
                      <div>
                        <p>
                          Le modèle « produire, consommer, jeter » est obsolète.
                          La voie pour une nouvelle économie est ouverte. Elle
                          se base sur la circularité et l’utilisation
                          intelligente de ressources renouvelables. Se référer à
                          l’écologie, c’est s’orienter vers un nouveau
                          paradigme, celui de l’ écolonomie.
                        </p>
                        <p>
                          OUVERT, bureau d’écolonomie, accompagne les
                          entreprises et les collectivités dans cette
                          transition. Nos clients diminuent leur empreinte sur
                          l’environnement, améliorent leur cadre de vie et
                          réalisent des économies financières.
                        </p>
                        <p>
                          Nous intervenons de manière transversale sur vos
                          produits ou services, vos process, votre bâtiment ou
                          territoire. Pour établir une étude technique et vous
                          accompagner dans la mise en place de solutions
                          écolonomiques innovantes. L’écolonomie devient une
                          opportunité de développement, d’expérimentation et
                          d’épanouissement.
                        </p>
                        <p>
                          Intégré à POCHECO, une industrie certifiée QSE, nous
                          proposons des solutions sur mesure dont la
                          méthodologie a été préalablement testée avec une
                          efficacité validée. Visitez notre site internet :
                          <a href="www.ouvert.eu">www.ouvert.eu</a>.
                        </p>
                        <p className="text-center">
                          <b>Quelques unes de nos références PDM</b>
                        </p>
                        <Row>
                          <Col lg={{ size: 4 }}>
                            <img
                              src="./img/logoPDM1.png"
                              alt="logo"
                              width="200"
                              height="80"
                            />
                          </Col>
                          <Col lg={{ size: 4 }}>
                            <img
                              src="./img/logoPDM2.png"
                              alt="logo"
                              width="200"
                              height="80"
                            />
                          </Col>
                          <Col lg={{ size: 4 }}>
                            <img
                              src="./img/logoPDM3.png"
                              alt="logo"
                              width="200"
                              height="80"
                            />
                          </Col>
                          <Col lg={{ size: 4 }}>
                            <img
                              src="./img/logoPDM4.png"
                              alt="logo"
                              width="200"
                              height="80"
                            />
                          </Col>
                          <Col lg={{ size: 4 }}>
                            <img
                              src="./img/logoPDM5.png"
                              alt="logo"
                              width="200"
                              height="80"
                            />
                          </Col>
                          <Col lg={{ size: 4 }}>
                            <img
                              src="./img/logoPDM6.png"
                              alt="logo"
                              width="200"
                              height="80"
                            />
                          </Col>
                        </Row>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        onClick={this.toggleDescription}
                        className="btn text-white"
                      >
                        Fermer
                      </button>
                    </ModalFooter>
                  </Modal>
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
                    travail.
                    <button className="toggleButton" onClick={this.togglePDM}>
                      Cliquez ici
                    </button>
                    pour en savoir plus sur la démarche.
                  </div>
                  <Modal
                    isOpen={this.state.modalPDM}
                    toggle={this.togglePDM}
                    className="modal-lg"
                  >
                    <ModalHeader close={closeBtnPDM}>
                      <b className="modalHeader">Le plan de mobilité (PDM)</b>
                    </ModalHeader>
                    <ModalBody className="p-4 text-justify">
                      <div>
                        <h4 className="text-center">
                          <b>Qu’est-ce qu’un PDM ?</b>
                        </h4>
                        <p>
                          L’ADEME nous donne la définition suivante du PDM : «
                          Le Plan de mobilité est un ensemble de mesures qui
                          vise à optimiser et augmenter l'efficacité des
                          déplacements des salariés d'une entreprise, pour
                          diminuer les émissions polluantes et réduire le trafic
                          routier. »
                        </p>
                        <h4 className="text-center">
                          <b>Pourquoi un PDM ?</b>
                        </h4>
                        <p>
                          Le plan de mobilité est obligatoire dans le périmètre
                          d’un plan de déplacements urbains pour toutes les
                          entreprises de plus de 100 salariés sur un même site.
                          Pour autant, la réglementation est-elle la seule bonne
                          raison d’entamer un PDM ? Non.
                        </p>
                        <p>
                          Le contexte économique et écologique nous oblige à
                          repenser notre vision de la mobilité et à diminuer
                          l’emprise de la voiture sur nos déplacements. Les PDM
                          constituent des leviers concrets du développement de
                          nouvelles habitudes de mobilité. Leur mise en place
                          permet de développer des réponses contextualisées aux
                          problèmes de mobilité rencontrés par votre structure :
                          éloignement des transports en commun, horaires
                          décalés, dispersion des employés sur le territoire, …
                          Les PDM sont avantageux pour l’entreprise et ses
                          employés sur de nombreux points :
                        </p>
                        <ul>
                          <li>
                            Economies d’énergie, baisse de l’impact sur
                            l’environnement de l’activité
                          </li>
                          <li>
                            Réduction des frais liés aux transport, à la gestion
                            des parkings, à la gestion des notes de frais, …
                          </li>
                          <li>
                            Réduction des risques d’accidents et du stress lié
                            aux embouteillages, amélioration du bien-être,
                            fierté d’appartenance à l’entreprise, …
                          </li>
                        </ul>

                        <h4 className="text-center">
                          <b>Quelle méthode ? </b>
                        </h4>
                        <p>
                          Pour proposer des mesures pertinentes dans le cadre
                          d’un PDM, il est nécessaire de connaître
                          l’accessibilité de son entreprise, les distances que
                          parcourent quotidiennement les salariés, et leurs
                          habitudes de déplacement. Ces éléments sont
                          accessibles en quelques clics grâce à l’outil MOUV’R.
                          Celui-ci vous permet en effet une géolocalisation des
                          salariés, un calcul des distances domicile-travail, le
                          diagnostic d’accessibilité à vélo de l’entreprise, la
                          diffusion d’une enquête sur les habitudes de
                          déplacement et une analyse statistique des réponses à
                          l’enquête.
                        </p>
                        <p>
                          Suite à l’accès à ces premiers éléments de diagnostic,
                          des propositions de mesure sont élaborées en
                          concertation avec la direction et les salariés de
                          votre entreprise. La mise en œuvre de ces mesures
                          aboutit à un report modal en faveur des modes
                          alternatifs à la voiture individuelle. Ce travail de
                          concertation et d’élaboration du plan d’actions peut
                          être réalisé par le bureau d’écolonomie OUVERT. Pour
                          plus d’informations à ce sujet, n’hésitez pas à nous
                          contacter (lien vers la page contact).
                        </p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        onClick={this.togglePDM}
                        className="btn text-white"
                      >
                        Fermer
                      </button>
                    </ModalFooter>
                  </Modal>
                </div>
              </ScrollAnimation>
            </Col>
            <Col lg={{ size: 4 }}>
              <ScrollAnimation animateIn="fadeIn">
                <div className="card homeCard">
                  <div className="card-header">
                    <h4>Démarche d’inscription</h4>
                  </div>
                  <div className="card-body pt-4">
                    En 3 clics, les premières étapes de votre plan de mobilité
                    sont réalisées ! Pour en savoir plus sur nos services et les
                    modalités d’inscription,
                    <button
                      className="toggleButton"
                      onClick={this.toggleInscription}
                    >
                      cliquez ici.
                    </button>
                  </div>
                  <Modal
                    isOpen={this.state.modalInscription}
                    toggle={this.toggleInscription}
                    className="modal-lg"
                  >
                    <ModalHeader close={closeBtnInscription}>
                      <b className="modalHeader">Modalités d'inscription</b>
                    </ModalHeader>
                    <ModalBody className="p-4 text-justify">
                      <div>
                        <h4 className="text-center">
                          <b>MOUV'R</b>
                        </h4>
                        <p>
                          L’outil MOUV’R, développé par le bureau d’écolonomie
                          OUVERT, vous permet d’entrer en quelques clics
                          seulement dans la démarche PDE. Grâce à MOUV’R, vous
                          réalisez la première étape de votre PDM en moins de 10
                          minutes. En effet, MOUV’R vous permet de :
                        </p>
                        <ul>
                          <li>
                            Diffuser par mail à l’ensemble de vos salariés une
                            enquête prérédigée portant sur les habitudes de
                            déplacement
                          </li>
                          <li>Suivre le taux de participation à l’enquête</li>
                          <li>
                            Consulter les résultats de l’enquête sous la forme
                            de données statistiques
                          </li>
                          <li>
                            Géolocaliser vos salariés et connaître les distances
                            domicile-travail parcourues par eux quotidiennement
                          </li>
                          <li>
                            Connaître l’accessibilité de votre site à vélo
                          </li>
                        </ul>

                        <h4 className="text-center">
                          <b>ET ENSUITE ?</b>
                        </h4>
                        <p>
                          Une fois ces premiers éléments de diagnostic établis,
                          vous pouvez:
                        </p>
                        <ul>
                          <li>
                            Compléter le diagnostic par une étude
                            d’accessibilité par les réseaux de transports en
                            commun : combien de vos salariés résident à
                            proximité d’une ligne de bus desservant directement
                            votre entreprise ? Quel est le temps de transport
                            depuis la gare la plus proche, et comment faire la
                            liaison ? … Cette étude peut être réalisée par
                            OUVERT. Pour cela, n’hésitez pas à nous contacter.
                          </li>
                          <li>
                            Organiser des groupes de travail pour construire
                            avec vos équipes un plan d’actions. Celui-ci reprend
                            l’ensemble des mesures à mettre en place au sein de
                            votre entreprise pour diminuer l’emprise de la
                            voiture individuelle dans les déplacements
                            quotidiens. Ces séances de travail peuvent être
                            animées par OUVERT. Pour cela, n’hésitez pas à nous
                            contacter.
                          </li>
                          <li>
                            Mettre en œuvre les mesures définies dans le plan
                            d’actions.
                          </li>
                        </ul>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <button
                        onClick={this.toggleInscription}
                        className="btn text-white"
                      >
                        Fermer
                      </button>
                    </ModalFooter>
                  </Modal>
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
