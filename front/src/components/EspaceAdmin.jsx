import React, { Component } from "react";
import HeaderAdmin from "./HeaderAdmin";
import Footer from "./Footer";
import "./EspaceAdmin.css";

class AccueilAdmin extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderAdmin />
        <div className="espaceAdmin mt-2">
          <h3>Espace Administrateur</h3>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AccueilAdmin;
