import React, { Component } from "react";
import Footer from "./Footer";
import APIGeoloc from "./APIGeoloc";
import "./css/Geolocalisation.css";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import csv from "csv";
import NotificationAlert from "react-notification-alert";

const successMsg = {
  place: "tr",
  message:
    "L'adresse postale a bien été prise en compte pour la géolocalisation",
  type: "success",
  autoDismiss: 4
};

const errorMsg = {
  place: "tr",
  message:
    "Nous avons rencontré un problème avec votre adresse postale, merci de vérifier les champs",
  type: "danger",
  autoDismiss: 4
};

class Geolocalisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressEmployeeToTable: undefined,
      addressEmployeeToArray: [],
      addressSocietyToLatLng: [],
      nbSociety: "",
      streetSociety: "",
      zipCodeSociety: "",
      citySociety: ""
    };
  }

  alertFunctionSuccess = () => {
    this.refs.notificationAlertSuccess.notificationAlert(successMsg);
  };

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  handleSubmitSocietyAddress = event => {
    event.preventDefault();
    /*let body = {                        ===> To KEEP to send to server
      nbSociety: this.state.nbSociety,
      streetSociety: this.state.streetSociety,
      zipCodeSociety: this.state.zipCodeSociety,
      citySociety: this.state.citySociety
    };*/
    let addressSocietyToArray = [
      this.state.nbSociety,
      this.state.streetSociety,
      this.state.zipCodeSociety,
      this.state.citySociety
    ];
    let dataStr = addressSocietyToArray.join("+").replace(" ", "+");
    axios
      .get(`https://api-adresse.data.gouv.fr/search/?q=${dataStr}`)
      .then(result => {
        let newData = result.data.features[0].geometry.coordinates;
        newData.reverse();
        this.setState({
          addressSocietyToLatLng: newData
        });
        this.alertFunctionSuccess();
      })
      .catch(err => {
        console.log(err);
        this.alertFunctionError();
      });
    this.setState({
      nbSociety: "",
      streetSociety: "",
      zipCodeSociety: "",
      citySociety: ""
    });
  };

  handleFiles = files => {
    const reader = new FileReader();
    reader.onload = e => {
      csv.parse(reader.result, (err, data) => {
        this.setState({
          addressEmployeeToArray: data
        });
      });
      this.setState({
        addressEmployeeToTable: reader.result
      });
    };
    reader.readAsText(files[0]);
  };

  render() {
    const addressEmployee = this.state.addressEmployeeToArray;
    const addressSociety = this.state.addressSocietyToLatLng;
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <hr />
        <div className="listAddress mt-2">
          <Container>
            <Row>
              <Col lg={{ size: 2 }}>
                <button
                  className="mt-2 btn text-white"
                  onClick={this.handleSubmit}
                >
                  Revenir à l'accueil
                </button>
              </Col>
              <Col lg={{ size: 8 }}>
                <h3>Géolocaliser vos salariés</h3>
              </Col>
            </Row>
          </Container>
          <Container className="mt-3">
            <Row>
              <NotificationAlert ref="notificationAlertSuccess" />
              <NotificationAlert ref="notificationAlertError" />
              <p className="text-justify m-4">
                Lorem ipsum sit amet dolor lorem ipsum sit amet dolor, lorem
                ipsum sit amet dolor Lorem ipsum sit amet dolor lorem ipsum sit
                amet dolor, lorem ipsum sit amet dolor Lorem ipsum sit amet
                dolor lorem ipsum sit amet dolor.
              </p>
            </Row>
            <form onSubmit={this.handleSubmitSocietyAddress}>
              <label>
                Merci de renseigner l'adresse postale de l'entreprise :
              </label>
              <Row>
                <Col md={{ size: 2 }}>
                  <input
                    type="text"
                    className="form-control"
                    name="nbSociety"
                    id="inputNbSociety"
                    onChange={this.handleChange}
                    value={this.state.nbSociety}
                    ref={ref => (this.inputNbSociety = ref)}
                    placeholder="N° de rue"
                  />
                </Col>
                <Col md={{ size: 4 }}>
                  <input
                    type="text"
                    className="form-control"
                    name="streetSociety"
                    id="inputStreetSociety"
                    onChange={this.handleChange}
                    value={this.state.streetSociety}
                    ref={ref => (this.inputStreetSociety = ref)}
                    placeholder="Nom de rue"
                  />
                </Col>
                <Col md={{ size: 3 }}>
                  <input
                    type="text"
                    className="form-control"
                    name="zipCodeSociety"
                    id="inputZipCodeSociety"
                    onChange={this.handleChange}
                    value={this.state.zipCodeSociety}
                    ref={ref => (this.inputZipCodeSociety = ref)}
                    placeholder="Code postal"
                  />
                </Col>
                <Col md={{ size: 3 }}>
                  <input
                    type="text"
                    className="form-control"
                    name="citySociety"
                    id="inputCitySociety"
                    onChange={this.handleChange}
                    value={this.state.citySociety}
                    ref={ref => (this.inputCitySociety = ref)}
                    placeholder="Ville"
                  />
                </Col>
              </Row>
              <button className="btn text-white mt-3">Envoyer</button>
            </form>
            <hr />
            <ReactFileReader
              fileTypes={[".csv"]}
              handleFiles={this.handleFiles}
            >
              <button className="btn text-white mb-3 mt-3">
                Importer un fichier CSV d'adresses postales
              </button>
            </ReactFileReader>
            <div className="importAddress">
              {this.state.addressEmployeeToTable !== undefined ? (
                <CsvToHtmlTable
                  data={this.state.addressEmployeeToTable}
                  csvDelimiter=","
                  tableClassName="table table-striped table-hover"
                  hasHeader={false}
                />
              ) : (
                <div className="csvExample">
                  Exemple de fichier .csv
                  <table className=" mt-3 table table-striped ">
                    <tbody>
                      <tr>
                        <td>50</td>
                        <td>rue</td>
                        <td>de Provence</td>
                        <td>59000</td>
                        <td>Lille</td>
                      </tr>
                      <tr>
                        <td>3 B</td>
                        <td>boulevard</td>
                        <td>Vauban</td>
                        <td>59000</td>
                        <td>Lille</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Container>
          <APIGeoloc
            addressEmployee={addressEmployee}
            addressSociety={addressSociety}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Geolocalisation;
