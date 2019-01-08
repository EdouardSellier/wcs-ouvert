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
      confirmMail: "",
      password: "",
      confirmPassword: "",
      lastname: "",
      firstname: "",
      companyName: "",
      siret: "",
      companyAddress: "",
      phoneNumber: ""
    };
  }

  alertFunctionSuccess = () => {
    this.refs.notificationAlert.notificationAlert(successMsg);
  };

  handleChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleChangeConfirmPassword = event => {
    this.setState({
      confirmPassword: event.target.value
    });
  };

  handleChangeMail = event => {
    this.setState({
      mail: event.target.value
    });
  };

  handleChangeConfirmMail = event => {
    this.setState({
      confirmMail: event.target.value
    });
  };

  handleChangeLastname = event => {
    this.setState({
      lastname: event.target.value
    });
  };

  handleChangeFirstname = event => {
    this.setState({
      firstname: event.target.value
    });
  };

  handleChangeCompanyAddress = event => {
    this.setState({
      companyAddress: event.target.value
    });
  };

  handleChangePhoneNumber = event => {
    this.setState({
      phoneNumber: event.target.value
    });
  };

  handleChangeCompanyName = event => {
    this.setState({
      companyName: event.target.value
    });
  };

  handleChangeSiret = event => {
    this.setState({
      siret: event.target.value
    });
  };

  isSignedIn = event => {
    event.preventDefault();
    let body = {
      mail: this.state.mail,
      password: this.state.password,
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      company_name: this.state.companyName,
      siret: this.state.siret,
      company_address: this.state.companyAddress,
      phone_number: this.state.phoneNumber
    };
    axios({
      method: "post",
      url: "http://localhost:8080/inscription",
      data: body
    })
      .then(res => {
        if (res.data === "SUCCESS") {
          this.setState({
            mail: "",
            confirmMail: "",
            password: "",
            confirmPassword: "",
            lastname: "",
            firstname: "",
            companyName: "",
            siret: "",
            companyAddress: "",
            phoneNumber: ""
          });
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
                  value={this.state.companyName}
                  onChange={this.handleChangeCompanyName}
                  className="form-control"
                  id="inputRaisonSociale"
                  placeholder="Raison sociale"
                />
              </div>
              <div className="form-group col-md-6">
                <label>SIRET *</label>
                <input
                  type="text"
                  name="siret"
                  value={this.state.siret}
                  onChange={this.handleChangeSiret}
                  className="form-control"
                  id="inputSiret"
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
                  value={this.state.lastname}
                  onChange={this.handleChangeLastname}
                  className="form-control"
                  id="inputNom"
                  placeholder="Nom"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Prénom *</label>
                <input
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChangeFirstname}
                  className="form-control"
                  id="inputPrenom"
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
                  value={this.state.companyAddress}
                  onChange={this.handleChangeCompanyAddress}
                  className="form-control"
                  id="inputAdresse"
                  placeholder="Adresse du siège"
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  Adresse de facturation (si différente de l'adresse du siège)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAdresse2"
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
                  value={this.state.mail}
                  onChange={this.handleChangeMail}
                  className="form-control"
                  id="inputEmail"
                  placeholder="E-mail"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Confirmation adresse e-mail *</label>
                <input
                  type="text"
                  onChange={this.handleChangeConfirmMail}
                  value={this.state.confirmMail}
                  className="form-control"
                  id="inputEmail2"
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
                  value={this.state.phoneNumber}
                  onChange={this.handleChangePhoneNumber}
                  className="form-control"
                  id="inputTel"
                  placeholder="06XXXXXXXX"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Nombre de site soumis à la réglementation PDM *</label>
                <input type="text" className="form-control" id="inputNbSites" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Création du mot de passe *</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                  className="form-control"
                  id="inputPassword"
                  placeholder="Choisissez votre mot de passe"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Confirmation du mot de passe *</label>
                <input
                  type="password"
                  onChange={this.handleChangeConfirmPassword}
                  value={this.state.confirmPassword}
                  className="form-control"
                  id="inputPassword2"
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
