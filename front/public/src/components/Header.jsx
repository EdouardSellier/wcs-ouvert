import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

class Header extends Component {
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
                    <Link to="/" className="navLink">
                      Accueil
                    </Link>
                  </li>
                  <li className="nav-item pl-3">
                    <Link to="/inscription" className="navLink">
                      Inscription
                    </Link>
                  </li>
                  <li className="nav-item pl-3">
                    <Link to="/connexion" className="navLink">
                      Connexion
                    </Link>
                  </li>
                  <li className="nav-item pl-3 pr-2">
                    <Link to="/contact" className="navLink">
                      Contact
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

export default Header;
