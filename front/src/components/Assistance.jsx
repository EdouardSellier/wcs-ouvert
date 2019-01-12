import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

class Assistance extends Component {
  constructor() {
    super();
    this.state = {
      fields: {
        email: "",
        message: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePost(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let body = {
      email: this.state.fields.email,
      message: this.state.fields.message
    };
    axios({
      method: "post",
      url: "http://localhost:8080/contact",
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/listeenquetesrh");
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
                  onClick={this.handleSubmit}
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
                téléphone au <i className="fa fa-phone" /> 03.20.61.90.89.
              </p>
              <form method="post" action="" className="mt-2">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="inputEmailContact"
                    placeholder="Adresse e-mail"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    name="message"
                    className="form-control"
                    id="inputMessageContact"
                    placeholder="Votre message..."
                  />
                </div>
                <button type="submit" className="btn text-white">
                  Envoyer ma demande <i className="fa fa-envelope" />
                </button>
              </form>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

export default Assistance;
