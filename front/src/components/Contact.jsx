import React, { Component } from "react";
import { Col, Form } from "reactstrap";
import "./css/Contact.css";
import axios from "axios";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: undefined,
        message: undefined,
        confirmation: ""
      }
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  contactForm = event => {
    event.preventDefault();
    let body = {
      email: this.state.fields.email,
      message: this.state.fields.message
    };
    axios({
      method: "post",
      url: "http://localhost:8080/contact",
      data: body
    })
      .then(res => {
        if (res.status === 200) {
          let fields = {};
          fields["email"] = "";
          fields["message"] = "";
          this.setState({
            confirmation: (
              <p className="confirm">Le message a bien été envoyé</p>
            ),
            fields: fields
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Col lg={{ size: 6, offset: 3 }}>
          <div className="contact card shadow p-5">
            <h2>Nous contacter</h2>
            <p className="mt-3 text-left">
              Si vous rencontrez un problème, n’hésitez pas à nous contacter par
              mail via le formulaire ci-dessous ou à nous joindre par téléphone
              au <i className="fa fa-phone" /> 03.20.61.90.89.
            </p>
            <Form
              onSubmit={this.contactForm}
              method="post"
              action=""
              className="mt-2"
            >
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmailContact"
                  placeholder="Adresse e-mail"
                  onChange={this.handleChange}
                  value={this.state.fields.email || ""}
                />
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  name="message"
                  className="form-control"
                  id="inputMessageContact"
                  placeholder="Votre message..."
                  onChange={this.handleChange}
                  value={this.state.fields.message || ""}
                />
              </div>
              <button type="submit" className="btn text-white">
                Envoyer ma demande <i className="fa fa-envelope" />
              </button>
            </Form>
            {this.state.confirmation}
          </div>
        </Col>
      </div>
    );
  }
}

export default Contact;
