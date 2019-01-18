import React from "react";
import { Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import "./css/Home.css";
import { urlBackEnd } from "../conf";

const successMsg = {
  place: "br",
  message: "Votre inscription a bien été prise en compte",
  type: "success",
  autoDismiss: 5
};

const errorMsg = {
  place: "br",
  message:
    "Il semblerait qu'il y ait un problème avec votre inscription, merci de vérifier tous les champs",
  type: "danger",
  autoDismiss: 5
};

class Inscription extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        mail: "",
        confirmMail: "",
        password: "",
        confirmPassword: "",
        lastname: "",
        firstname: "",
        company_name: "",
        siret: "",
        company_address: "",
        company_address2: "",
        phone_number: "",
        nb_sites: "",
        empty: ""
      },
      errors: {}
    };
  }

  alertFunctionSuccess = () => {
    this.refs.notificationAlertSuccess.notificationAlert(successMsg);
  };

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  };

  submitUserRegistrationForm = e => {
    e.preventDefault();
    let body = {
      mail: this.state.fields.mail,
      password: this.state.fields.password,
      lastname: this.state.fields.lastname,
      firstname: this.state.fields.firstname,
      company_name: this.state.fields.company_name,
      siret: this.state.fields.siret,
      company_address: this.state.fields.company_address,
      phone_number: this.state.fields.phone_number
    };
    if (this.validateForm()) {
      let fields = {};
      fields["siret"] = "";
      fields["company_address"] = "";
      fields["company_address2"] = "";
      fields["lastname"] = "";
      fields["firstname"] = "";
      fields["phone_number"] = "";
      fields["nb_sites"] = "";
      fields["mail"] = "";
      fields["confirmMail"] = "";
      fields["password"] = "";
      fields["confirmPassword"] = "";
      fields["nb_sites"] = "";
      this.setState({ fields: fields });
      let app = axios;
      app
        .post(`${urlBackEnd}/auth/inscription`, body)
        .then(res => {
          if (res.data === "Signup successful") {
            this.alertFunctionSuccess();
          }
        })
        .catch(error => {
          this.alertFunctionError();
        });
    }
  };

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (
      !fields["siret"] ||
      !fields["company_name"] ||
      !fields["company_address"] ||
      !fields["lastname"] ||
      !fields["firstname"] ||
      !fields["phone_number"] ||
      !fields["nb_sites"] ||
      !fields["mail"] ||
      !fields["confirmMail"] ||
      !fields["password"] ||
      !fields["confirmPassword"]
    ) {
      formIsValid = false;
      errors["empty"] = "Merci de renseigner tous les champs";
    }
    if (fields["confirmMail"] !== fields["mail"]) {
      formIsValid = false;
      errors["confirmMail"] =
        "L'adresse e-mail est différente de l'adresse saisie";
    }
    if (fields["confirmPassword"] !== fields["password"]) {
      formIsValid = false;
      errors["confirmPassword"] =
        "Le mot de passe est différent du mot de passe saisi";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div className="mb-5">
        <NotificationAlert ref="notificationAlertSuccess" />
        <NotificationAlert ref="notificationAlertError" />
        <div className="inscriptionContainer">
          <Col lg={{ size: 8, offset: 2 }}>
            <form
              method="post"
              name="userRegistrationForm"
              onSubmit={this.submitUserRegistrationForm}
              className="mt-5 mb-4 card shadow inscriptionForm"
            >
              <h2 className="mt-3 mb-5 text-center">Inscription</h2>
              <Row>
                <Col lg={{ size: 5, offset: 1 }}>
                  <input
                    type="text"
                    name="company_name"
                    onChange={this.handleChange}
                    value={this.state.fields.company_name || ""}
                    placeholder="Raison sociale"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 5 }}>
                  <input
                    type="text"
                    name="siret"
                    onChange={this.handleChange}
                    value={this.state.fields.siret || ""}
                    placeholder="N° SIRET (14 chiffres)"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 5, offset: 1 }}>
                  <input
                    type="text"
                    name="lastname"
                    onChange={this.handleChange}
                    value={this.state.fields.lastname || ""}
                    placeholder="Nom"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 5 }}>
                  <input
                    type="text"
                    name="firstname"
                    onChange={this.handleChange}
                    value={this.state.fields.firstname || ""}
                    placeholder="Prénom"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 5, offset: 1 }}>
                  <input
                    type="text"
                    name="company_address"
                    onChange={this.handleChange}
                    value={this.state.fields.company_address || ""}
                    placeholder="Adresse de la société"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 5 }}>
                  <input
                    type="text"
                    name="company_address2"
                    onChange={this.handleChange}
                    value={this.state.fields.company_address2 || ""}
                    placeholder="Adresse de facturation si différente"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 5, offset: 1 }}>
                  <input
                    type="text"
                    name="phone_number"
                    onChange={this.handleChange}
                    value={this.state.fields.phone_number || ""}
                    placeholder="N° de téléphone"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 5 }}>
                  <input
                    type="text"
                    name="nb_sites"
                    onChange={this.handleChange}
                    value={this.state.fields.nb_sites || ""}
                    placeholder="Nombre de sites soumis à la réglementation"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 5, offset: 1 }}>
                  <input
                    type="text"
                    name="mail"
                    onChange={this.handleChange}
                    value={this.state.fields.mail || ""}
                    placeholder="Adresse e-mail"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 5 }}>
                  <input
                    type="email"
                    name="confirmMail"
                    onChange={this.handleChange}
                    value={this.state.fields.confirmMail || ""}
                    placeholder="Confirmation de l'adresse e-mail"
                    className="form-control"
                  />
                  {this.state.errors.confirmMail !== undefined ? (
                    <div className="errorMsg">
                      {this.state.errors.confirmMail}
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 5, offset: 1 }}>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.fields.password || ""}
                    placeholder="Mot de passe"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 5 }} xs={{ size: 12 }}>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={this.handleChange}
                    value={this.state.fields.confirmPassword || ""}
                    placeholder="Confirmation du mot de passe"
                    className="form-control"
                  />
                  {this.state.errors.confirmPassword !== undefined ? (
                    <div className="errorMsg">
                      {this.state.errors.confirmPassword}
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="emptyMsg pb-4">{this.state.errors.empty}</div>
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 4, offset: 4 }}>
                  <button className="btn text-white ml-5 mb-3">
                    Valider mon inscription <i className="fa fa-check" />
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </div>
      </div>
    );
  }
}

export default withRouter(Inscription);
