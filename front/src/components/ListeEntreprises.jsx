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
      nbPages: 0,
      nextPage: 0,
      modalAddPayment: false,
      modalRemovePayment: false,
      isSelected: 5,
      currentCell: []
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
    let startPage = 0 + this.state.nextPage;
    let body = {
      start: startPage,
      limit: this.state.isSelected
    };
    axios({
      method: "post",
      url: "http://localhost:8080/admin/list/society",
      data: body
    })
      .then(res => {
        let arrayShown = res.data.data;
        let nbPages = Math.ceil(res.data.totalCount / this.state.isSelected);
        this.setState({
          societyList: arrayShown,
          nbPages: nbPages
        });
      })
      .catch(error => {
        this.alertFunctionError();
      });
  };

  componentDidMount = () => {
    this.getList();
  };

  changePageUp = () => {
    let newPage =
      parseInt(this.state.isSelected) + parseInt(this.state.nextPage);
    this.setState(
      {
        currentPage: this.state.currentPage + 1,
        nextPage: newPage
      },
      () => {
        this.getList();
      }
    );
  };

  isDisabledUpButton = () => {
    return this.state.currentPage > 1;
  };

  changePageDown = () => {
    let newPage =
      parseInt(this.state.nextPage) - parseInt(this.state.isSelected);
    if (this.state.currentPage > 1) {
      this.setState(
        {
          currentPage: this.state.currentPage - 1,
          nextPage: newPage
        },
        () => {
          this.getList();
        }
      );
    }
  };

  isDisabledDownButton = () => {
    return this.state.currentPage < this.state.nbPages;
  };

  toggleAddPayment = () => {
    this.setState({
      modalAddPayment: !this.state.modalAddPayment
    });
  };

  hasPaid = () => {
    let body = {};
    if (this.state.currentCell.has_paid === 0) {
      body = {
        id: this.state.currentCell.id,
        mail: this.state.currentCell.mail,
        has_paid: 1
      };
    } else if (this.state.currentCell.has_paid === 1) {
      body = {
        id: this.state.currentCell.id,
        mail: this.state.currentCell.mail,
        has_paid: 0
      };
    }
    axios({
      method: "post",
      url: "http://localhost:8080/admin/payment",
      data: body
    })
      .then(res => {
        if (res.data === "SUCCESS") {
          this.getList();
          this.setState({
            modalAddPayment: false,
            modalRemovePayment: false
          });
        }
      })
      .catch(error => {
        this.alertFunctionErrorPayment();
      });
  };

  toggleRemovePayment = () => {
    this.setState({
      modalRemovePayment: !this.state.modalRemovePayment
    });
  };

  getSurveyListPage = () => {
    this.props.history.push("/listeenquetes");
  };

  onClickCell = (e, column, item) => {
    if (column === "has_paid") {
      if (item.has_paid === 0) {
        this.setState(
          {
            currentCell: item
          },
          this.toggleAddPayment()
        );
      } else if (item.has_paid === 1) {
        this.setState(
          {
            currentCell: item
          },
          this.toggleRemovePayment()
        );
      }
    }
  };

  render() {
    const closeBtnAdd = (
      <button className="close" onClick={this.toggleAddPayment}>
        &times;
      </button>
    );

    const ModalAddPayment = () => {
      return (
        <Modal
          isOpen={this.state.modalAddPayment}
          toggle={this.toggleAddPayment}
        >
          <ModalHeader close={closeBtnAdd}>
            {this.state.currentCell.company_name} est en attente de paiement
          </ModalHeader>
          <ModalBody>
            <p>
              <strong>
                Avez-vous reçu le règlement de{" "}
                {this.state.currentCell.company_name} ?
              </strong>
            </p>
            <p>
              Si vous confirmez, {this.state.currentCell.company_name} recevra
              un e-mail de confirmation et pourra désormais bénéficier de nos
              services.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.hasPaid();
              }}
              className="btn-success text-white"
            >
              Oui je confirme
            </Button>
            <Button
              onClick={() => {
                this.toggleAddPayment();
              }}
              className="btn text-white"
            >
              Annuler
            </Button>
          </ModalFooter>
        </Modal>
      );
    };

    const closeBtnRemove = (
      <button className="close" onClick={this.toggleRemovePayment}>
        &times;
      </button>
    );

    const ModalRemovePayment = () => {
      return (
        <Modal
          isOpen={this.state.modalRemovePayment}
          toggle={this.toggleRemovePayment}
        >
          <ModalHeader close={closeBtnRemove}>
            {this.state.currentCell.company_name} n'est plus à jour de paiement.
          </ModalHeader>
          <ModalBody>
            <p>
              <strong>
                Souhaitez-vous désactiver le compte de{" "}
                {this.state.currentCell.company_name} ?
              </strong>
            </p>
            <p>
              Si vous confirmez, {this.state.currentCell.company_name} recevra
              un e-mail indiquant qu'ils n'ont plus accès à notre plateforme
              faute de règlement.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.hasPaid();
              }}
              className="btn-warning"
            >
              Oui je confirme
            </Button>
            <Button
              onClick={() => {
                this.toggleRemovePayment();
              }}
              className="btn text-white"
            >
              Annuler
            </Button>
          </ModalFooter>
        </Modal>
      );
    };

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
        cell: function(item) {
          if (item.has_paid === 0) {
            return (
              <div>
                <button
                  className="btn btn-warning btn-sm paymentButton"
                  title="Confirmer la réception du paiement"
                >
                  En attente <i className="fa fa-clock-o ml-1" />
                </button>
                <ModalAddPayment />
              </div>
            );
          } else {
            return (
              <div>
                <button
                  className="btn btn-success btn-sm paymentButton"
                  title="Désactiver le compte"
                >
                  Accepté <i className="fa fa-check ml-2" />
                </button>
                <ModalRemovePayment />
              </div>
            );
          }
        }
      }
    ];

    return (
      <div className="text-white mt-3">
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
              <h2>
                <b>Liste des entreprises inscrites</b>
              </h2>
            </Col>
            <Col lg={{ size: 2 }}>
              <Button className="btn-danger" onClick={this.handleSubmit}>
                <i className="fa fa-power-off" /> Déconnexion
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="mt-5 description">
                <b>
                  L'e-mail de confirmation d'inscription sera envoyé aux
                  sociétés quand elles seront à jour de réglement. Vous avez
                  également la possibilité de revenir en arrière en cas de
                  problème.
                </b>
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
          <Row className="card shadow">
            <Col lg={{ size: 12 }}>
              <JsonTable
                rows={this.state.societyList}
                columns={columns}
                noRowsMessage="Aucun élément à afficher"
                className="table table-striped"
                onClickCell={this.onClickCell}
              />
              <div className="row justify-content-around pb-3 mt-3">
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
                className="btn getSurveyPage text-white mt-4 mb-3"
                onClick={this.getSurveyListPage}
              >
                <b>Consulter les enquêtes</b> <i className="fa fa-bar-chart" />{" "}
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
