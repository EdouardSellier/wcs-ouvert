import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./css/Inscription.css";
import axios from "axios";
import NotificationAlert from "react-notification-alert";

const successMsg = {
  place: "tr",
  message: "Ton inscription a bien été prise en compte",
  type: "success",
  autoDismiss: 4
};

class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      confirm_mail: "",
      password: "",
      confirm_password: "",
      lastname: "",
      firstname: "",
      company_name: "",
      siret: "",
      company_address: "",
      company_address2: "",
      phone_number: "",
      nb_sites: ""
    };
  }

  alertFunctionSuccess = () => {
    this.refs.notificationAlert.notificationAlert(successMsg);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  isSignedIn = event => {
    event.preventDefault();
    let body = {
      mail: this.state.mail,
      password: this.state.password,
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      company_name: this.state.company_name,
      siret: this.state.siret,
      company_address: this.state.company_address,
      phone_number: this.state.phone_number
    };
    axios({
      method: "post",
      url: "http://localhost:8080/inscription",
      data: body
    })
      .then(res => {
        if (res.data === "SUCCESS") {
          this.inputMail.value = "";
          this.inputConfirmMail.value = "";
          this.inputPassword.value = "";
          this.inputConfirmPassword.value = "";
          this.inputLastname.value = "";
          this.inputFirstname.value = "";
          this.inputCompanyName.value = "";
          this.inputSiret.value = "";
          this.inputCompanyAddress.value = "";
          this.inputCompanyAddress2.value = "";
          this.inputPhoneNumber.value = "";
          this.inputNbSites.value = "";
          this.props.history.push("/inscription");
          this.alertFunctionSuccess();
        }
      })
      .catch(error => {
        console.log("Fail: " + error);
      });
  };

  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <Header />
        <div className="inscription mt-3">
          <NotificationAlert ref="notificationAlert" />
          <h2>Inscription</h2>
          <form className="inscriptionForm" onSubmit={this.isSignedIn}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Raison Sociale *</label>
                <input
                  type="text"
                  name="company_name"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputCompanyName"
                  ref={ref => (this.inputCompanyName = ref)}
                  placeholder="Raison sociale"
                />
              </div>
              <div className="form-group col-md-6">
                <label>SIRET *</label>
                <input
                  type="text"
                  name="siret"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputSiret"
                  ref={ref => (this.inputSiret = ref)}
                  placeholder="N° SIRET"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Nom *</label>
                <input
                  type="text"
                  name="lastname"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputLastname"
                  ref={ref => (this.inputLastname = ref)}
                  placeholder="Nom"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Prénom *</label>
                <input
                  type="text"
                  name="firstname"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputFirstname"
                  ref={ref => (this.inputFirstname = ref)}
                  placeholder="Prénom"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Adresse du siège *</label>
                <input
                  type="text"
                  name="company_address"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputCompanyAdress"
                  ref={ref => (this.inputCompanyAddress = ref)}
                  placeholder="Adresse du siège"
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  Adresse de facturation (si différente de l'adresse du siège)
                </label>
                <input
                  type="text"
                  name="company_address2"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputCompanyAdress2"
                  ref={ref => (this.inputCompanyAddress2 = ref)}
                  placeholder="Adresse de facturation"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Adresse e-mail *</label>
                <input
                  type="email"
                  name="mail"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputMail"
                  ref={ref => (this.inputMail = ref)}
                  placeholder="E-mail"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Confirmation adresse e-mail *</label>
                <input
                  type="text"
                  name="confirm_mail"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputConfirmMail"
                  ref={ref => (this.inputConfirmMail = ref)}
                  placeholder="Confirmation e-mail"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>N° de téléphone *</label>
                <input
                  type="text"
                  name="phone_number"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputPhoneNumber"
                  ref={ref => (this.inputPhoneNumber = ref)}
                  placeholder="06XXXXXXXX"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Nombre de site soumis à la réglementation PDM *</label>
                <input
                  type="text"
                  name="nb_sites"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputNbSites"
                  ref={ref => (this.inputNbSites = ref)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Création du mot de passe *</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputPassword"
                  ref={ref => (this.inputPassword = ref)}
                  placeholder="Choisissez votre mot de passe"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Confirmation du mot de passe *</label>
                <input
                  type="password"
                  name="confirm_password"
                  onChange={this.handleChange}
                  className="form-control"
                  id="inputConfirmPassword"
                  ref={ref => (this.inputConfirmPassword = ref)}
                  placeholder="Confirmez votre mot de passe"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Valider mon inscription
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Inscription;
