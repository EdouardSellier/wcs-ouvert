import React from "react";
import "./css/Inscription.css";
import Header from "./Header";
import Footer from "./Footer";
import { Row, Col } from "reactstrap";
import axios from "axios";
import NotificationAlert from "react-notification-alert";

const successMsg = {
  place: "tr",
  message: "Votre inscription a bien été prise en compte",
  type: "success",
  autoDismiss: 4
};

const errorMsg = {
  place: "tr",
  message:
    "Il semblerait qu'il y ait un problème avec votre inscription, merci de vérifier tous les champs",
  type: "danger",
  autoDismiss: 4
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
      this.setState({ fields: fields });
      axios({
        method: "post",
        url: "http://localhost:8080/inscription",
        data: body
      })
        .then(res => {
          if (res.data === "SUCCESS") {
            this.props.history.push("/inscription");
            this.alertFunctionSuccess();
          }
        })
        .catch(error => {
          console.log("Fail: " + error);
          this.alertFunctionError();
        });
    }
  };

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields[""]) {
      formIsValid = false;
      errors["empty"] =
        "Merci de renseigner tous les champs accompagnés d'une étoile *";
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
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <Header />
        <div
          id="main-registration-container"
          className="ml-lg-5 mr-lg-5 mt-lg-2"
        >
          <h2>Inscription</h2>
          <NotificationAlert ref="notificationAlertSuccess" />
          <NotificationAlert ref="notificationAlertError" />
          <div id="register">
            <form
              method="post"
              name="userRegistrationForm"
              onSubmit={this.submitUserRegistrationForm}
            >
              <Row>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Raison sociale *</label>
                  <input
                    type="text"
                    name="company_name"
                    onChange={this.handleChange}
                    value={this.state.fields.company_name}
                    placeholder="Nom de la société"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>SIRET *</label>
                  <input
                    type="text"
                    name="siret"
                    onChange={this.handleChange}
                    value={this.state.fields.siret}
                    placeholder="N° SIRET (14 chiffres)"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Nom *</label>
                  <input
                    type="text"
                    name="lastname"
                    onChange={this.handleChange}
                    value={this.state.fields.lastname}
                    placeholder="ex: Dupont"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Prénom *</label>
                  <input
                    type="text"
                    name="firstname"
                    onChange={this.handleChange}
                    value={this.state.fields.firstname}
                    placeholder="ex: Jean"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Adresse du siège *</label>
                  <input
                    type="text"
                    name="company_address"
                    onChange={this.handleChange}
                    value={this.state.fields.company_address}
                    placeholder="ex: 1 rue de Paris 59000 Lille"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Adresse de facturation</label>
                  <input
                    type="text"
                    name="company_address2"
                    onChange={this.handleChange}
                    value={this.state.fields.company_address2}
                    placeholder="Si différente de l'adresse du siège"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Numéro de téléphone *</label>
                  <input
                    type="text"
                    name="phone_number"
                    onChange={this.handleChange}
                    value={this.state.fields.phone_number}
                    placeholder="ex: 0601020304"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Nombre de sites *</label>
                  <input
                    type="text"
                    name="nb_sites"
                    onChange={this.handleChange}
                    value={this.state.fields.nb_sites}
                    placeholder="Nombre de sites soumis à la réglementation"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Adresse e-mail *</label>
                  <input
                    type="text"
                    name="mail"
                    onChange={this.handleChange}
                    value={this.state.fields.mail}
                    placeholder="ex: dupont.jean@mail.com"
                    className="form-control"
                  />
                </Col>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Confirmation adresse e-mail *</label>
                  <input
                    type="email"
                    name="confirmMail"
                    onChange={this.handleChange}
                    value={this.state.fields.confirmMail}
                    placeholder="Confirmez votre adresse e-mail"
                    className="form-control"
                  />
                  <div className="errorMsg">
                    {this.state.errors.confirmMail}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 6 }} xs={{ size: 12 }}>
                  <label>Mot de passe *</label>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.fields.password}
                    placeholder="Choisissez un mot de passe sécurisé"
                    className="form-control"
                  />
                </Col>
                <Col>
                  <label>Confirmation mot de passe *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={this.handleChange}
                    value={this.state.fields.confirmPassword}
                    placeholder="Confirmez votre mot de passe"
                    className="form-control"
                  />
                  <div className="errorMsg">
                    {this.state.errors.confirmPassword}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="emptyMsg pb-4">{this.state.errors.empty}</div>
                </Col>
              </Row>
              <Row>
                <Col
                  lg={{ size: 4, offset: 4 }}
                  md={{ size: 3, offset: 4 }}
                  sm={{ size: 10 }}
                >
                  <button className="btn text-white mb-3">
                    Valider mon inscription
                  </button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Inscription;
