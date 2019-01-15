import React, { Component } from "react";
import "./css/Header.css";

class Header extends Component {
  render() {
    return (
      <div className="fixed-top header pb-5">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand text-white" href="/">
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
                  <li className="nav-item pl-3">
                    <a className="text-white logLink" href="#inscription">
                      <i className="fa fa-address-card" /> INSCRIPTION /{" "}
                      <i className="fa fa-user" /> CONNEXION
                    </a>
                  </li>
                  <li className="nav-item pl-3 pr-2">
                    <a className="text-white contactLink" href="#contact">
                      <i className="fa fa-stack-exchange" /> CONTACT
                    </a>
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
