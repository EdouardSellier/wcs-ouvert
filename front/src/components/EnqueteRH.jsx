import React, { Component } from "react";
import questions from "./questions";
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
import NotificationAlert from "react-notification-alert";
import "./css/EspaceRH.css";
import { urlBackEnd } from "../conf";

const errorMsg = {
  place: "tr",
  message:
    "Nous avons rencontré un problème lors de l'envoi de l'enquête à vos salariés, nous vous remercions de bien vouloir contacter l'assistance.",
  type: "danger",
  autoDismiss: 4
};

const MultipleOption = props => {
  return (
    <React.Fragment>
      <br />
      <div className="">
        <label className="m-2" htmlFor={props.data.id}>
          {props.data.number}) {props.data.label}
        </label>
        <div className="m-3">
          <div className="">
            <span>1.</span>
            <ul id={props.data.id} className="">
              {props.data.possibilities.map(content => {
                return <li key={content}>{content}</li>;
              })}
            </ul>
          </div>
          <div className="">
            <span>2.</span>
            <ul id={props.data.id} className="">
              {props.data.possibilities.map(content => {
                return <li key={content}>{content}</li>;
              })}
            </ul>
          </div>
          <div className="">
            <span>3.</span>
            <ul id={props.data.id} className="">
              {props.data.possibilities.map(content => {
                return <li key={content}>{content}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Text = props => {
  return (
    <React.Fragment>
      <label className="m-2" htmlFor={props.data.id}>
        {props.data.number}) {props.data.label}
      </label>
      <br />
      <div className="surveyTextArea p-3" />
      <p />
    </React.Fragment>
  );
};

const Option = props => {
  return (
    <React.Fragment>
      <label className="m-2" htmlFor={props.data.id}>
        {props.data.number}) {props.data.label}
      </label>
      <br />
      <ul className="m-4" id={props.data.id}>
        {props.data.possibilities.map(content => {
          return <li key={content}>{content}</li>;
        })}
      </ul>
      <p />
    </React.Fragment>
  );
};

const Number = props => {
  return (
    <React.Fragment>
      <label className="m-2" htmlFor={props.data.id}>
        {props.data.number}) {props.data.label}
      </label>
      <br />
      <p className="mt-2 ml-4" id={props.data.id}>
        <em>0</em>
      </p>
      <br />
    </React.Fragment>
  );
};

class EnqueteRH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isSend: false
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/nouvelleenquete");
  };

  sendMails = () => {
    let body = {
      mails: this.props.location.state.mailsData,
      user_id: this.props.location.state.user_id,
      survey_name: this.props.location.state.survey_name
    };
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: `${urlBackEnd}/user/send/survey`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        this.setState({
          modal: false,
          isSend: true
        });
      })
      .catch(error => {
        this.alertFunctionError();
      });
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    return (
      <div className="text-white">
        <NotificationAlert ref="notificationAlertError" />
        <Container className="card shadow mt-5 mb-5 pt-3">
          <Row>
            <Col lg={{ size: 2 }}>
              <button
                className="mt-2 btn text-white"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-chevron-left" /> Précédent
              </button>
            </Col>
            <Col lg={{ size: 8 }}>
              <h1>Consulter et diffuser l'enquête à vos salariés</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 12 }}>
              <div>
                <div className="mt-5 surveyCard p-3">
                  {questions.map(data => {
                    switch (data.type) {
                      case "option":
                        return <Option key={data.id} data={data} />;
                      case "number":
                        return <Number key={data.id} data={data} />;
                      case "multipleOption":
                        return <MultipleOption key={data.id} data={data} />;
                      case "text":
                        return <Text key={data.id} data={data} />;
                      default:
                        return <p>Il y a une erreur.</p>;
                    }
                  })}
                </div>
              </div>
            </Col>
          </Row>
          {this.state.isSend === false ? (
            <Row>
              <Col lg={{ size: 8, offset: 2 }}>
                <p>
                  Pour créer une enquête personnalisée et ajouter des questions,
                  nous vous invitons à{" "}
                  <a href="/assistance">prendre contact avec nous</a>.
                </p>
              </Col>
              <Col lg={{ size: 6, offset: 3 }}>
                <button className="btn text-white m-3" onClick={this.toggle}>
                  <i className="fa fa-envelope-o" /> Diffuser l'enquête
                </button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col lg={{ size: 8, offset: 2 }}>
                <p className="mt-2 mb-2 confirmationMsg">
                  L'enquête a bien été envoyée à votre liste. Vous devez
                  attendre la date de fin indiquée lors de la création de
                  l'enquête pour obtenir les résultats.
                </p>
                <button
                  className="btn text-white mb-4"
                  onClick={() => {
                    this.props.history.push("/monespace");
                  }}
                >
                  <i className="fa fa-home" /> Revenir à l'accueil
                </button>
              </Col>
            </Row>
          )}

          <Modal isOpen={this.state.modal} toggle={this.toggle} className="">
            <ModalHeader
              toggle={this.toggle}
              close={closeBtn}
              className="modalHeader"
            >
              <b>Confirmer la diffusion</b>
            </ModalHeader>
            <ModalBody className="movieModal">
              <p>
                Votre enquête est prête, souhaitez-vous la diffuser à vos
                salariés ?
              </p>
              <p>
                L’enquête sera envoyée aux adresses e-mail renseignées dans la
                page de création de l’enquête,{" "}
                {this.props.location.state.nbMails > 1
                  ? `${
                      this.props.location.state.nbMails
                    } e-mails seront envoyés.`
                  : `${this.props.location.state.nbMails} e-mail sera envoyé.`}
              </p>
            </ModalBody>
            <ModalFooter className="movieModal">
              <Button
                onClick={() => {
                  this.sendMails();
                }}
                className="btn-success text-white"
              >
                Oui je confirme
              </Button>
              <Button onClick={this.toggle} className="bg-dark text-white">
                Non
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default EnqueteRH;
