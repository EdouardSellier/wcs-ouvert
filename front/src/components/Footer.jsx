import React, { Component } from "react";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import "./css/Footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    return (
      <footer className="footer navbar-dark">
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="ecolonomie mt-1 mb-2">BUREAU D'ECOLONOMIE</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="adresseOuvert mb-2">
                POCHECO - 13 rue des Roloirs, F 59510 Forest sur Marque - Tél. :
                +33 (0)3 20 61 90 89 - bureau@ouvert.eu
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 2, offset: 5 }}>
              <div className="legalMentions mb-2" onClick={this.toggle}>
                Mentions Légales
              </div>
            </Col>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="modal-lg"
            >
              <ModalHeader close={closeBtn}>
                <b className="modalHeader">MENTIONS LÉGALES</b>
              </ModalHeader>
              <ModalBody className="p-4 text-justify">
                <div>
                  <p>
                    Conformément aux dispositions légales contenues dans
                    l’article 6 III de La loi du 21 juin 2004, appelée loi pour
                    la confiance dans l’économie numérique.
                  </p>
                  <h4>PROPRIÉTÉ ET RESPONSABILITÉ</h4>
                  <p>Le présent site est la propriété de :</p>
                  <p>
                    POCHECO SAS
                    <br />
                    13, rue des Roloirs
                    <br />
                    59510 Forest-sur-Marque
                    <br />
                    Tél: 03 20 61 90 90
                    <br />
                    SAS au Capital de 3 465 000 €
                    <br />
                    SIRET 301 522 496 00027
                    <br />
                    FR14301522496
                  </p>
                  <p>
                    Législation française du Droit d’accès au fichier
                    informatisé: tout utilisateur ayant déposé dans le site des
                    informations directement ou indirectement nominatives peut
                    demander la communication des informations nominatives le
                    concernant à l’administrateur du service et les faire
                    rectifier le cas échéant, conformément à la loi française No
                    78-17 du 6 janvier 1978 relative à l’informatique, aux
                    fichiers et aux libertés. Contactez la personne citée
                    ci-dessous pour toute modification.
                  </p>
                  <h4>CRÉDITS</h4>
                  <p>
                    Ce site a été créé par les étudiants de la{" "}
                    <a href="https://wildcodeschool.fr">Wild Code School</a> de
                    Lille :
                  </p>
                  <ul>
                    <li>Elie Delattre</li>
                    <li>Emma Kimpe</li>
                    <li>Antoine Maluta</li>
                    <li>Maureen Vinchent</li>
                  </ul>
                  <h4>DIRECTEUR DE LA PUBLICATION</h4>
                  <p>Emmanuel DRUON, Président</p>
                  <p>
                    Contact pour toute question/modification concernant le site
                    : edouard.sellier@ouvert.eu
                  </p>
                  <p>
                    Hébergement du site chez OVH, 2 rue Kellermann, 59100
                    Roubaix, France
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <button onClick={this.toggle} className="btn text-white">
                  Fermer
                </button>
              </ModalFooter>
            </Modal>
          </Row>
          <Row>
            <Col>
              <a
                href="https://wildcodeschool.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="madeWithLove mb-2"
              >
                Made with <span className="heart">♥</span> by Wild Code School
              </a>
            </Col>
          </Row>
        </div>
      </footer>
    );
  }
}
export default Footer;
