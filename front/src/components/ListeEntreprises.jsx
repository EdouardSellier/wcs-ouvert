import React, { Component } from "react";
import HeaderAdmin from "./HeaderAdmin";
import Footer from "./Footer";
import "./ListeEntreprises.css";

class ListeEntreprises extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderAdmin />
        <div className="listeEntreprises mt-2">
          <h3>Liste des entreprises</h3>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ListeEntreprises;
