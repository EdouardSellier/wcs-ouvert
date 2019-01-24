import React, { Component } from "react";
import { Container, Row, Col, Form } from "reactstrap";
import axios from "axios";
import { urlBackEnd } from "../conf";

class Assistance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: "",
        message: "",
        confirmation: ""
      }
    };
  }

  handleBack = event => {
    event.preventDefault();
    this.props.history.push("/listeenquetesrh");
  };

  handleChange = e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  };

  contactForm = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    let body = {
      email: this.state.fields.email,
      message: this.state.fields.message
    };
    axios({
      method: "post",
      url: `${urlBackEnd}/assistance`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
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
        <div className="text-white mb-5">
          <Container className="mt-2">
            <Row>
              <Col lg={{ size: 2 }}>
                <button
                  className="mt-2 btn text-white"
                  onClick={this.handleBack}
                >
                  <i className="fa fa-arrow-left" /> Précédent
                </button>
              </Col>
              <Col lg={{ size: 8 }}>
                <h1>
                  <b>Assistance</b>
                </h1>
              </Col>
            </Row>
          </Container>
          <Col lg={{ size: 6, offset: 3 }}>
            <div className="contact card shadow p-5">
              <p className="mt-3 text-left">
                Si vous rencontrez un problème, n’hésitez pas à nous contacter
                par mail via le formulaire ci-dessous ou à nous joindre par
                téléphone au <i className="fa fa-phone" /> 03 20 61 90 89.
              </p>
              <Form onSubmit={this.contactForm} className="mt-2">
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
                    type="message"
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
      </div>
    );
  }
}

export default Assistance;
