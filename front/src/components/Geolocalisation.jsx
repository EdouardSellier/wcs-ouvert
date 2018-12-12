import React, { Component } from "react";
import Footer from "./Footer";
import APIGeoloc from "./APIGeoloc";
import "./css/Geolocalisation.css";
import { Container, Row, Col } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";
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

const problemMsg = {
  place: "tr",
  message:
    "Nous avons rencontré un problème lors de l'enregistrement de votre adresse, nous vous remercions de bien vouloir recommencer",
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

  alertFunctionProblem = () => {
    this.refs.notificationAlertError.notificationAlert(problemMsg);
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
    let body = {
      nbSociety: this.state.nbSociety,
      streetSociety: this.state.streetSociety,
      zipCodeSociety: this.state.zipCodeSociety,
      citySociety: this.state.citySociety
    };
    axios({
      method: "post",
      url: "http://localhost:8080/societyAddress",
      data: body
    })
      .then(res => {
        if (res.status !== 200) {
          this.alertFunctionProblem();
        }
      })
      .catch(error => {
        console.log("Fail: " + error);
      });
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
        let validateAddress = result.data.features[0].properties.city.toLowerCase();
        let query = result.data.query.toLowerCase();
        let newData = result.data.features[0].geometry.coordinates;
        if (query.includes(validateAddress)) {
          this.setState({
            addressSocietyToLatLng: newData,
            nbSociety: "",
            streetSociety: "",
            zipCodeSociety: "",
            citySociety: ""
          });
          this.alertFunctionSuccess();
        } else {
          this.alertFunctionError();
        }
      })
      .catch(err => {
        this.alertFunctionError();
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
              <NotificationAlert ref="notificationAlertProblem" />
              <p className="text-justify m-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                optio ex non. Atque aspernatur laudantium totam hic? Dolorem
                sapiente laboriosam ab consequatur repellat vel. Amet in
                assumenda ad rerum molestiae!{" "}
                <span className="glyphicon glyphicon-ok-circle" />
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
                    placeholder="N°"
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
                    placeholder="Ville"
                  />
                </Col>
              </Row>
              <button className="btn text-white mt-3 mb-3">Enregistrer</button>
            </form>
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
                <div>
                  <span className="titleExample">
                    Merci de suivre l'exemple ci-dessous pour l'import de votre
                    fichier CSV :
                  </span>
                  <img
                    src="https://www.motorradreifendirekt.de/_ui/desktop/common/mctshop/images/icons/info-icon.png"
                    alt="infoIcon"
                    width="30"
                    height="30"
                    className="ml-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Fichier informatique de type tableur (Excel) avec une extension .csv"
                  />
                  <table className=" mt-3 table table-striped csvExample">
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
          <hr />
          <APIGeoloc
            addressEmployee={addressEmployee}
            addressSociety={addressSociety}
            profile="driving-car"
            rangeType="distance"
            range="5000,10000,20000"
            parameter="en voiture"
            distance="Distance"
            measure="km"
          />
          <hr />
          <APIGeoloc
            addressEmployee={addressEmployee.reverse()}
            addressSociety={addressSociety.reverse()}
            profile="cycling-regular"
            rangeType="time"
            range="300,600,900"
            parameter="à vélo"
            distance="Durée du trajet"
            measure=" minutes "
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Geolocalisation;
