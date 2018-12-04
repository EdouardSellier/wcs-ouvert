import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./css/Connexion.css";
import axios from "axios";
import NotificationAlert from "react-notification-alert";

const dangerMsg = {
  place: "tr",
  message: "Ton email ou ton mot de passe est incorrect",
  type: "danger",
  autoDismiss: 4
};

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      password: ""
    };
  }

  alertFunctionDanger = () => {
    this.refs.notificationAlert.notificationAlert(dangerMsg);
  };

  isLoggedIn = event => {
    event.preventDefault();
    let body = {
      mail: this.state.mail,
      password: this.state.password
    };
    axios({
      method: "post",
      url: "http://localhost:8080/connexion",
      data: body
    })
      .then(res => {
        if (res.data === "SUCCESS") {
          this.props.history.push("/monespace");
        }
      })
      .catch(error => {
        this.alertFunctionDanger();
        console.log("Fail: " + error);
      });
  };

  handleChangeEmail = event => {
    this.setState({
      mail: event.target.value
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
          <NotificationAlert ref="notificationAlert" />
          <h2>Connexion à mon espace</h2>
          <form className="mt-5" onSubmit={this.isLoggedIn}>
            <div className="form-group offset-3 col-md-6">
              <label>Adresse e-mail *</label>
              <input
                type="email"
                name="mail"
                className="form-control"
                id="inputEmailConnexion"
                placeholder="Adresse e-mail"
                onChange={this.handleChangeEmail}
                value={this.state.mail}
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
                value={this.state.password}
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
