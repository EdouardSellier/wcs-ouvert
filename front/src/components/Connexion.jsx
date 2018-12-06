import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./css/Connexion.css";
import { Row, Col } from "reactstrap";
import axios from "axios";
import NotificationAlert from "react-notification-alert";

const dangerMsg = {
  place: "tr",
  message: "Votre email et/ou votre mot de passe sont incorrects",
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
          <Row>
            <Col
              lg={{ size: 6, offset: 3 }}
              md={{ size: 8, offset: 2 }}
              sm={{ size: 10, offset: 1 }}
              xs={{ size: 10, offset: 1 }}
            >
              <form
                className="mt-5 formContainer shadow"
                onSubmit={this.isLoggedIn}
              >
                <div className="form-group">
                  <label>Adresse e-mail</label>
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
                <div className="form-group">
                  <label>Mot de passe</label>
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
                <button type="submit" className="btn text-white mt-3">
                  Me connecter
                </button>
              </form>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Connexion;
