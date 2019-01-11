import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Col } from "reactstrap";
import axios from "axios";
import NotificationAlert from "react-notification-alert";

const dangerMsg = {
  place: "br",
  message:
    "Votre email et/ou votre mot de passe sont incorrects ou il y a un problème avec votre compte. Merci de nous recontacter si le problème persiste.",
  type: "danger",
  autoDismiss: 5
};

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  alertFunctionDanger = () => {
    this.refs.notificationAlert.notificationAlert(dangerMsg);
  };

  isLoggedIn = event => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/auth/connexion", this.state)
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem("currentUser", this.state.mail);
        localStorage.setItem("id", user.id);
        localStorage.setItem("token", token);
        localStorage.setItem("is_admin", user.admin);
        localStorage.setItem("has_paid", user.has_paid);
        if (user.admin === 1) {
          this.props.history.push("/admin");
        } else if (user.admin === 0 && user.has_paid === 1) {
          this.props.history.push("/monespace");
        }
      })
      .catch(error => {
        this.alertFunctionDanger();
      });
  };

  render() {
    return (
      <div>
        <div className="connexionContainer">
          <NotificationAlert ref="notificationAlert" />
          <Col
            lg={{ size: 6, offset: 3 }}
            md={{ size: 8, offset: 2 }}
            sm={{ size: 10, offset: 1 }}
            xs={{ size: 10, offset: 1 }}
          >
            <form
              className="formContainer card shadow"
              onSubmit={this.isLoggedIn}
            >
              <h2 className="mt-2 mb-5 text-center">Connexion à mon espace</h2>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text form-control bg-transparent">
                      <i className="fa fa-envelope" />
                    </span>
                  </div>
                  <input
                    type="email"
                    name="mail"
                    className="form-control"
                    id="inputMailConnexion"
                    ref={ref => (this.inputMailConnexion = ref)}
                    placeholder="Adresse e-mail"
                    onChange={this.handleChange}
                    value={this.state.mail}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text form-control bg-transparent">
                      <i className="fa fa-lock passwordIcon" />
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPasswordConnexion"
                    ref={ref => (this.inputPasswordConnexion = ref)}
                    placeholder="Mot de passe"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </div>
              </div>
              <button type="submit" className="btn text-white mt-3 loginButton">
                Me connecter
              </button>
            </form>
          </Col>
        </div>
      </div>
    );
  }
}

export default withRouter(Connexion);
