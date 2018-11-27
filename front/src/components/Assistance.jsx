import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/Assistance.css";

class Assistance extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="assistance mt-2">
          <h3>Assistance</h3>
          <p className="mt-3">
            Lorem ipsum sit dolor amet, lorem ipsum sit dolor amet.
          </p>
          <form method="post" action="" className="mt-3">
            <div className="form-group offset-3 col-md-6">
              <label>Adresse e-mail</label>
              <input
                type="email"
                className="form-control"
                id="inputEmailContact"
                placeholder="Adresse e-mail"
              />
            </div>
            <div className="form-group offset-3 col-md-6">
              <label>Votre message :</label>
              <textarea
                type="text"
                className="form-control"
                id="inputMessageContact"
                placeholder="Votre message..."
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Envoyer ma demande
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Assistance;
