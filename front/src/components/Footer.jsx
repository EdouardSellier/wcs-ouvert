import React, { Component } from "react";
import "./css/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer navbar-dark">
        <div className="container-fluid">
          <div className="row">
            <div className="adresseOuvert text-white col-lg-12">
              POCHECO - 13 rue des Roloirs, F 59510 Forest sur Marque - Tél. :
              +33 (0)3 20 61 90 89 - bureau@ouvert.eu
            </div>
          </div>
          <div className="row">
            <div className="legalMentions text-white col-lg-12">
              Mentions Légales
            </div>
          </div>
          <div className="row">
            <a
              href="https://wildcodeschool.fr"
              className="madeWithLove col-lg-12"
            >
              Made with <span className="heart">♥</span> by Wild Code School
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
