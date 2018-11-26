import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HeaderAdmin.css";

class HeaderAdmin extends Component {
  render() {
    return (
      <div className="header">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand text-white" href="!#">
              MOUV'R
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="w-100">
                <ul className="navbar-nav row justify-content-end">
                  <li className="nav-item active pl-3">
                    <Link to="/admin" className="navLink">
                      Accueil
                    </Link>
                  </li>
                  <li className="nav-item pl-3">
                    <Link to="/listeentreprises" className="navLink">
                      Liste des entreprises
                    </Link>
                  </li>
                  <li className="nav-item pl-3">
                    <Link to="/listeenquetes" className="navLink">
                      Liste des enquêtes
                    </Link>
                  </li>
                  <li className="nav-item pl-3">
                    <Link to="/" className="navLink">
                      Déconnexion
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderAdmin;
