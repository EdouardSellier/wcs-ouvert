import React, { Component } from "react";
import Header from "./Header";
import "./css/Contact.css";

class Contact extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <Header />
        <div className="contact mt-3">
          <h2>Nous contacter</h2>
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
      </div>
    );
  }
}

export default Contact;
