import React, { Component } from "react";
import "./css/NouvelleEnquete.css";
import { Container, Row, Col } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";
import csv from "csv";
import axios from "axios";

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
    let body = {
      survey_name: this.state.survey_name,
      ending_date: this.state.ending_date,
      all_mails: JSON.stringify(this.state.mailsArray)
    };
    axios({
      method: "post",
      url: "http://localhost:8080/rh/survey",
      data: body
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
        console.log("Fail: " + error);
      });
  };

  render() {
    return (
      <div>
        <hr />
        <div className="card shadow m-5 pt-3">
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
                <h3>Commencer une nouvelle enquête</h3>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="mt-4 mb-3 description">
              <Col md={{ size: 10, offset: 1 }}>
                Depuis cette page, vous pouvez consulter et diffuser une enquête
                pour mieux comprendre leurs habitudes de déplacement. <br />
                Cela vous permettra par la suite d’élaborer un plan d’actions
                pertinent pour réduire la part d’utilisation de la voiture
                individuelle dans les déplacements quotidiens de vos salariés.
              </Col>
            </Row>
            <form onSubmit={this.handleForm} className="m-5 pt-3 pb-3 pr-3">
              <Row>
                <Col md={{ size: 3 }}>
                  <label className="mt-2">Nom de l'enquête</label>
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
                  <label className="mt-2">Date de fin de l'enquête</label>
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
                  <label>Importer les adresses e-mail de mes salariés</label>
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
                  Suivant <i className="fa fa-arrow-right" />
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
