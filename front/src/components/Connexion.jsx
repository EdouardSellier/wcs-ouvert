import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./css/Connexion.css";

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  /*handleSubmit = event => {
    event.preventDefault();
    if (this.state.email.includes("rh")) {
      this.props.history.push("/monespace");
    } else if (this.state.email.includes("admin")) {
      this.props.history.push("/admin");
    }
  };*/

  handleChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  handleChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <Header />
        <div className="connexion mt-3">
          <h2>Connexion à mon espace</h2>
          <form
            method="post"
            action="http://localhost:8080/connexion"
            className="mt-5"
            //onSubmit={this.handleSubmit}
          >
            <div className="form-group offset-3 col-md-6">
              <label>Adresse e-mail *</label>
              <input
                type="email"
                name="mail"
                className="form-control"
                id="inputEmailConnexion"
                placeholder="Adresse e-mail"
                onChange={this.handleChangeEmail}
              />
            </div>
            <div className="form-group offset-3 col-md-6">
              <label>Mot de passe *</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputPasswordConnexion"
                placeholder="Mot de passe"
                onChange={this.handleChangePassword}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Me connecter
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Connexion;
