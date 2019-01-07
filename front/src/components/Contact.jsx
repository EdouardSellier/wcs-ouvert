import React, { Component } from "react";
import "./css/Contact.css";
import { Col } from "reactstrap";

class Contact extends Component {
  render() {
    return (
      <div>
        <Col lg={{ size: 6, offset: 3 }}>
          <div className="contact card shadow p-5">
            <h2>Nous contacter</h2>
            <p className="mt-3 text-left">
              Si vous rencontrez un problème, n’hésitez pas à nous contacter par
              mail via le formulaire ci-dessous ou à nous joindre par téléphone
              au <i className="fa fa-phone" /> 03.20.61.90.89.
            </p>
            <form method="post" action="" className="mt-2">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmailContact"
                  placeholder="Adresse e-mail"
                />
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control"
                  id="inputMessageContact"
                  placeholder="Votre message..."
                />
              </div>
              <button type="submit" className="btn text-white">
                Envoyer ma demande <i className="fa fa-envelope" />
              </button>
            </form>
          </div>
        </Col>
      </div>
    );
  }
}

export default Contact;
