import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Accueil.css";

class Home extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <Header />
        <div className="home">
          <img
            src="https://www.rvroundtable.com/wp-content/uploads/revslider/home5/placeholder-1200x500.png"
            alt="homeImage"
            className="img-fluid homeImage"
          />
          <div className="container mt-3 mb-3">
            <div className="row justify-content-between">
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-header">1er card</div>
                  <div className="card-body">Description des services</div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-header">2ème card</div>
                  <div className="card-body">Description des services</div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-header">3ème card</div>
                  <div className="card-body">Description des services</div>
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

export default Home;
