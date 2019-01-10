import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/NouvelleEnquete.css";

class Home extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="nouvelleEnquete mt-3">
          <h4>Commencer une nouvelle enquête</h4>
          <div className="container mt-5">
            <form method="post" action="">
              <div className="form-row">
                <div className="form-group offset-md-3 col-md-6">
                  <label>Nom de l'enquête</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNomEnquete"
                    placeholder="Société X Lille"
                  />
                </div>
              </div>
              <label>Adresse du lieu de travail</label>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    id="inputNom"
                    placeholder="N° de rue"
                  />
                </div>
                <div className="form-group col-md-2">
                  <select>
                    <option>Complément</option>
                    <option>Bis</option>
                    <option>Ter</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPrenom"
                    placeholder="Nom de rue"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputAdresse"
                    placeholder="Lieu-dit"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputCodePostal"
                    placeholder="Code postal"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputVille"
                    placeholder="Ville"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                Créer mon enquête
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
