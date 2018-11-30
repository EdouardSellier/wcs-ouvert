import React, { Component } from "react";
import HeaderAdmin from "./HeaderAdmin";
import Footer from "./Footer";
import "./css/ListeEnquetes.css";

class ListeEnquetes extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderAdmin />
        <div className="listeEnquetes mt-2">
          <h3>Liste des enquêtes</h3>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ListeEnquetes;
