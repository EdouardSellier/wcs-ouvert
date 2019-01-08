import React, { Component } from "react";
import Header from "./Header";
import "./css/Connexion.css";
import { Col } from "reactstrap";
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
        const { token } = response.data;
        localStorage.setItem("currentUser", this.state.mail);
        localStorage.setItem("token", token);