import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";
import NotificationAlert from "react-notification-alert";
import csv from "csv";
import axios from "axios";
import "./css/EnqueteRH.css";

const errorMsg = {
  place: "tr",
  message:
    "Vous devez compléter tous les champs avant de passer à l'étape suivante.",
  type: "danger",
  autoDismiss: 4
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survey_name: "",
      ending_date: "",
      mailsData: "",
      mailsArray: [],
      nbMails: 0
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  mailImport = event => {
    event.preventDefault();
  };

  handleFiles = files => {
    const reader = new FileReader();
    reader.onload = e => {
      csv.parse(reader.result, (err, data) => {
        this.setState({
          mailsData: reader.result,
          mailsArray: data
        });
      });
    };
    reader.readAsText(files[0]);
  };

  handleForm = event => {
    event.preventDefault();
    const id = localStorage.getItem("id");
    let body = {
      survey_name: this.state.survey_name,
      ending_date: this.state.ending_date,
      all_mails: JSON.stringify(this.state.mailsArray),
      user_id: id
    };
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: "http://localhost:8080/user/survey",
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data === "SUCCESS") {
          this.setState({
            nbMails: this.state.mailsArray.length
          });
          this.props.history.push({
            pathname: "/sondageRH",
            state: {
              nbMails: this.state.nbMails,
              mailsData: this.state.mailsArray
            }
          });
        }
      })
      .catch(error => {
        this.alertFunctionError();
      });
  };

  render() {
    return (
      <div>
        <div className="card shadow m-5 pt-3">
          <NotificationAlert ref="notificationAlertError" />
          <Container className="mt-2">
            <Row>
              <Col lg={{ size: 2 }}>
                <button
                  className="mt-2 btn text-white"
                  onClick={this.handleSubmit}
                >
                  <i className="fa fa-home" /> Revenir à l'accueil
                </button>
              </Col>
              <Col lg={{ size: 8 }}>
                <h1>Commencer une nouvelle enquête</h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <form onSubmit={this.handleForm} className="m-5 pt-3 pb-3 pr-3">
              <Row>
                <Col md={{ size: 3 }}>
                  <label className="mt-2">
                    <b>Nom de l'enquête</b>
                  </label>
                </Col>
                <Col md={{ size: 3 }}>
                  <input
                    type="text"
                    name="survey_name"
                    onChange={this.handleChange}
                    value={this.state.survey_name}
                    placeholder="Société X Lille"
                    className="form-control"
                  />
                </Col>
                <Col md={{ size: 3 }}>
                  <label className="mt-2">
                    <b>Date de fin de l'enquête</b>
                  </label>
                </Col>
                <Col md={{ size: 3 }}>
                  <input
                    type="date"
                    className="form-control"
                    name="ending_date"
                    onChange={this.handleChange}
                    value={this.state.ending_date}
                    placeholder="Date de fin"
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md={{ size: 10, offset: 1 }}>
                  <label className="mb-3">
                    <b>Importer les adresses e-mail de mes salariés</b>
                  </label>
                  <ReactFileReader
                    fileTypes={[".csv"]}
                    handleFiles={this.handleFiles}
                  >
                    <button
                      className="btn newSurveyButton mb-3"
                      onClick={this.mailImport}
                    >
                      <i className="fa fa-upload" /> Importer un fichier csv
                    </button>
                  </ReactFileReader>
                  <div className="card importMails">
                    <CsvToHtmlTable
                      data={this.state.mailsData}
                      csvDelimiter="    "
                      tableClassName="table table-striped table-hover"
                      hasHeader={false}
                    />
                  </div>
                  {this.state.mailsArray.length !== 0 ? (
                    <Col lg={{ size: 5, offset: 7 }}>
                      <p className="pr-3 pt-1 pl-1">
                        <b>{this.state.mailsArray.length}</b> adresse
                        {this.state.mailsArray.length <= 1
                          ? " e-mail importée"
                          : "s e-mail importées"}{" "}
                        <i className="fa fa-check" />
                      </p>
                    </Col>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Col md={{ size: 3, offset: 9 }}>
                <button className="btn text-white mt-4 mb-3">
                  Consulter le sondage avant envoi{" "}
                  <i className="fa fa-arrow-right" />
                </button>
              </Col>
            </form>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
