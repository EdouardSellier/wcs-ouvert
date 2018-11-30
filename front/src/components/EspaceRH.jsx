import React, { Component } from "react";
import Footer from "./Footer";
import "./css/EspaceRH.css";
import { Link } from "react-router-dom";

class EspaceRH extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="espaceRh">
          <div className="container">
            <div className="row">
              <div className="offset-lg-2 col-8">
                <p className="homeSlogan">
                  MOUV'R : Enquête de mobilité pour vos salariés
                </p>
              </div>
              <div className="col-lg-2">
                <button
                  className="mt-2 btn btn-danger"
                  onClick={this.handleSubmit}
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
          <div className="espaceRH mt-3">
            <h3>Mon Espace</h3>
            <div className="container mt-5">
              <div className="row">
                <p className="text-justify ml-5 mr-5">
                  Lorem ipsum sit amet dolor lorem ipsum sit amet dolor, lorem
                  ipsum sit amet dolor Lorem ipsum sit amet dolor lorem ipsum
                  sit amet dolor, lorem ipsum sit amet dolor Lorem ipsum sit
                  amet dolor lorem ipsum sit amet dolor, lorem ipsum sit amet
                  dolor Lorem ipsum sit amet dolor lorem ipsum sit amet dolor,
                  lorem ipsum sit amet dolor.
                </p>
              </div>
            </div>
            <hr />
            <div className="container mt-3 mb-3">
              <div className="row justify-content-between">
                <div className="col-lg-3">
                  <div className="card">
                    <div className="card-header">
                      Commencer une nouvelle enquête
                    </div>
                    <div className="card-body">
                      <Link to="/nouvelleenquete" className="">
                        <img
                          src="https://image.freepik.com/iconen-gratis/het-invoeren-van-tekst-op-browser-cirkelsymbool_318-57678.jpg"
                          alt="icon"
                          width="180"
                          height="180"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card">
                    <div className="card-header">
                      Consulter mes enquêtes en cours
                    </div>
                    <div className="card-body">
                      <Link to="/listeenquetesrh" className="">
                        <img
                          src="https://monsieurlepsy.files.wordpress.com/2015/04/checklist-41335_640.png"
                          alt="icon"
                          width="170"
                          height="170"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="card">
                    <div className="card-header">
                      Si vous avez besoin d'assistance
                    </div>
                    <div className="card-body">
                      <Link to="/assistance" className="">
                        <img
                          src="http://cdn.onlinewebfonts.com/svg/img_571111.png"
                          alt="icon"
                          width="170"
                          height="170"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default EspaceRH;
