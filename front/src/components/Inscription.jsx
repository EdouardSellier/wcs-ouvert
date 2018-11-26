import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Inscription.css";

class Inscription extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <Header />
        <div className="inscription mt-3">
          <h2>Inscription</h2>
          <form method="post" action="" className="inscriptionForm">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Raison Sociale *</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputRaisonSociale"
                  placeholder="Raison sociale"
                />
              </div>
              <div className="form-group col-md-6">
                <label>SIRET *</label>
                <input
                  type="text"
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
                  className="form-control"
                  id="inputNom"
                  placeholder="Nom"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Prénom *</label>
                <input
                  type="text"
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
                  className="form-control"
                  id="inputEmail"
                  placeholder="E-mail"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Confirmation adresse e-mail *</label>
                <input
                  type="text"
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
                  className="form-control"
                  id="inputPassword"
                  placeholder="Choisissez votre mot de passe"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Confirmation du mot de passe *</label>
                <input
                  type="password"
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
