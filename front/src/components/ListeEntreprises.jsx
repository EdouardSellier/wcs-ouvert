import React, { Component } from "react";
import "./css/ListeEntreprises.css";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import axios from "axios";
import JsonTable from "ts-react-json-table";
import NotificationAlert from "react-notification-alert";

const errorMsg = {
  place: "tr",
  message: "La liste ne peut pas être affichée.",
  type: "danger",
  autoDismiss: 4
};

const errorPaymentMsg = {
  place: "tr",
  message:
    "Nous n'avons pas pu confirmer le paiement, il y a peut-être un problème avec la base de données.",
  type: "danger",
  autoDismiss: 4
};

class ListeEntreprises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      societyList: [],
      currentPage: 1,
      nbPages: 1,
      modal: false,
      isSelected: 5
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  alertFunctionErrorPayment = () => {
    this.refs.notificationAlertError.notificationAlert(errorPaymentMsg);
  };

  backToHome = event => {
    event.preventDefault();
    this.props.history.push("/admin");
  };

  handleChange = e => {
    this.setState(
      {
        isSelected: e.target.value
      },
      () => {
        this.getList();
      }
    );
  };

  getList = () => {
    axios
      .get("http://localhost:8080/admin/list/society")
      .then(result => {
        let arrayShown = result.data;
        let nbPages = Math.ceil(arrayShown.length / this.state.isSelected);
        switch (this.state.currentPage) {
          case 1:
            arrayShown = arrayShown.slice(0, this.state.isSelected);
            break;
          case 2:
            arrayShown = arrayShown.slice(
              this.state.isSelected,
              this.state.isSelected * 2
            );
            break;
          case 3:
            arrayShown = arrayShown.slice(
              this.state.isSelected * 2,
              this.state.isSelected + this.state.isSelected * 2
            );
            break;
          case 4:
            arrayShown = arrayShown.slice(
              this.state.isSelected * 2,
              this.state.isSelected + this.state.isSelected * 2
            );
            break;
          case 5:
            arrayShown = arrayShown.slice(this.state.isSelected);
            break;
          default:
            arrayShown = arrayShown.slice(0, this.state.isSelected);
        }
        this.setState({
          societyList: arrayShown,
          nbPages: nbPages
        });
      })
      .catch(err => {
        this.alertFunctionError();
      });
  };

  componentDidMount = () => {
    this.getList();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  hasPaid = columnKey => {
    this.state.societyList.map(society => {
      if (columnKey.id === society.id) {
        let body = {
          id: society.id,
          mail: society.mail,
          has_paid: 1
        };
        return axios({
          method: "post",
          url: "http://localhost:8080/admin/payment",
          data: body
        })
          .then(res => {
            if (res.data === "SUCCESS") {
              this.getList();
            }
          })
          .catch(error => {
            this.alertFunctionErrorPayment();
          });
      }
      return society;
    });
  };

  changePageUp = () => {
    if (
      this.state.currentPage >= 1 &&
      this.state.currentPage < this.state.nbPages
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
      this.getList();
    }
  };

  isDisabledUpButton = () => {
    return this.state.currentPage !== 1;
  };

  changePageDown = () => {
    if (this.state.currentPage >= 2 && this.state.currentPage <= 5) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
      this.getList();
    }
  };

  isDisabledDownButton = () => {
    return this.state.currentPage !== this.state.nbPages;
  };

  getSurveyListPage = () => {
    this.props.history.push("/listeenquetes");
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    let columns = [
      {
        key: "company_name",
        label: "Raison Sociale"
      },
      { key: "siret", label: "SIRET" },
      { key: "lastname", label: "Nom" },
      { key: "firstname", label: "Prénom" },
      { key: "mail", label: "Adresse E-mail" },
      {
        key: "phone_number",
        label: "N° de téléphone",
        cell: columnKey => {
          return <div>0{columnKey.phone_number}</div>;
        }
      },
      {
        key: "has_paid",
        label: "Paiement",
        cell: columnKey => {
          return (
            <div>
              {columnKey.has_paid === 0 ? (
                <div>
                  <button
                    onClick={this.toggle}
                    className="btn btn-warning btn-sm"
                    title="Confirmer la réception du paiement"
                  >
                    En attente
                  </button>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className=""
                  >
                    <ModalHeader
                      toggle={this.toggle}
                      close={closeBtn}
                      className="modalHeader"
                    >
                      {columnKey.company_name} est en attente de paiement
                    </ModalHeader>
                    <ModalBody className="movieModal">
                      <strong>
                        Avez-vous reçu le règlement de {columnKey.company_name}{" "}
                        ?
                      </strong>
                      <p>
                        Si vous confirmez, {columnKey.company_name} recevra un
                        e-mail de confirmation et pourra désormais bénéficier de
                        nos services.
                      </p>
                    </ModalBody>
                    <ModalFooter className="movieModal">
                      <Button
                        onClick={() => {
                          this.hasPaid(columnKey);
                        }}
                        className="btn-success text-white"
                      >
                        Oui je confirme
                      </Button>
                      <Button
                        onClick={this.toggle}
                        className="bg-dark text-white"
                      >
                        Non pas encore
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              ) : (
                <p className="hasPaid">
                  Ok <i className="fa fa-check-circle" />
                </p>
              )}
            </div>
          );
        }
      }
    ];

    return (
      <div>
        <hr />
        <NotificationAlert ref="notificationAlertError" />
        <NotificationAlert ref="notificationAlertErrorPayment" />
        <Container>
          <Row>
            <Col lg={{ size: 2 }}>
              <button className="btn text-white" onClick={this.backToHome}>
                <i className="fa fa-home" /> Revenir à l'accueil
              </button>
            </Col>
            <Col lg={{ size: 8 }}>
              <h2>Liste des entreprises inscrites</h2>
            </Col>
            <Col lg={{ size: 2 }}>
              <Button className="btn-danger" onClick={this.handleSubmit}>
                <i className="fa fa-power-off" /> Déconnexion
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="mt-5">
                L'e-mail de confirmation d'inscription sera envoyé aux sociétés
                quand elles seront à jour de réglement.
              </p>
            </Col>
          </Row>
          <Row className="mt-4 mb-2">
            <Col lg={{ size: 2, offset: 10 }}>
              <label className="mt-3 mr-3">Afficher :</label>
              <select
                onChange={this.handleChange}
                value={this.state.isSelected}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 12 }}>
              <JsonTable
                rows={this.state.societyList}
                columns={columns}
                className="table table-striped"
              />
              <div className="row justify-content-around pb-3 mb-5 mt-3">
                <button
                  className="btn arrowLeft"
                  onClick={this.changePageDown}
                  disabled={!this.isDisabledUpButton()}
                >
                  <i className="fa fa-chevron-left" />
                </button>
                <span>
                  Page {this.state.currentPage} / {this.state.nbPages}
                </span>
                <button
                  className="btn arrowRight"
                  onClick={this.changePageUp}
                  disabled={!this.isDisabledDownButton()}
                >
                  <i className="fa fa-chevron-right" />
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 2, offset: 10 }}>
              <button
                className="btn getSurveyPage mb-3"
                onClick={this.getSurveyListPage}
              >
                Consulter les enquêtes <i className="fa fa-bar-chart" />{" "}
                <i className="fa fa-arrow-right" />
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ListeEntreprises;
