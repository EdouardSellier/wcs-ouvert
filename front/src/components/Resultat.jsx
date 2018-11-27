import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/Resultat.css";

class Resultat extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="resultat mt-2">
          <h3>Résultat</h3>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Resultat;
