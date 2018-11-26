import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./Sondage.css";

class Sondage extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="sondage mt-2">
          <h3>Sondage</h3>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Sondage;
