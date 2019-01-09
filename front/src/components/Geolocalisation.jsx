import React, { Component } from "react";
//import APIGeoloc from "./APIGeoloc";
import { Container, Row, Col } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";
import NotificationAlert from "react-notification-alert";
import ReactFileReader from "react-file-reader";
import axios from "axios";
import csv from "csv";
//import domtoimage from "dom-to-image";
//import jsPDF from "jspdf";
//import ScrollAnimation from "react-animate-on-scroll";
import "./css/Geolocalisation.css";

const errorMsg = {
  place: "tr",
  message:
    "Nous avons rencontré un problème avec votre adresse postale, merci de vérifier les champs",
  type: "danger",
  autoDismiss: 4
};

const errorLimitMsg = {
  place: "tr",
  message:
    "Vous avez dépassé la limite des 800 salariés, nous vous invitons à contacter l'assistance. Merci de votre compréhension.",
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
      employeeMapData: [],
      societyMapData: "",
      societyAddress: "",
      societyLat: "",
      societyLng: "",
      isChecked: false,
      addressEmployeeToTable: undefined,
      societyIsSend: false,
      employeeIsSend: false
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  alertFunctionErrorLimit = () => {
    this.refs.notificationAlertError.notificationAlert(errorLimitMsg);
  };

  alertFunctionProblem = () => {
    this.refs.notificationAlertError.notificationAlert(problemMsg);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  backToHome = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  handleSubmitSocietyAddress = event => {
    event.preventDefault();
    let addressSocietyToArray = [
      this.state.nbSociety,
      this.state.streetSociety,
      this.state.zipCodeSociety,
      this.state.citySociety
    ];
    let dataStr = addressSocietyToArray.join(" ");
    const regex = / /gi;
    let queryAddress = dataStr.replace(regex, "+");
    axios
      .get(`https://api-adresse.data.gouv.fr/search/?q=${queryAddress}`)
      .then(result => {
        let societyPosition = result.data.features[0].geometry.coordinates;
        let latSociety = societyPosition[1];
        let lngSociety = societyPosition[0];
        let allSocietyData = {
          address: dataStr,
          lat: latSociety,
          lng: lngSociety
        };
        this.setState({
          societyMapData: allSocietyData,
          isChecked: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFiles = files => {
    const reader = new FileReader();
    reader.onload = e => {
      csv.parse(reader.result, (err, data) => {
        if (data.length < 800) {
          this.setState({
            addressEmployeeToTable: reader.result
          });
          let employeeMapData = this.state.employeeMapData;
          let societyMapData = this.state.societyMapData;
          data.map(address => {
            let allAddress = [address.join(" ")];
            return employeeMapData.push(allAddress);
          });
          this.setState({ employeeMapData, societyMapData: societyMapData });
        }
      });
    };
    reader.readAsText(files[0]);
  };

  sendEmployeeDataToServer = () => {
    let employeeMapData = this.state.employeeMapData;
    let allEmployeeData = [];
    employeeMapData.map(data => {
      let addressEmployee = [data];
      return allEmployeeData.push(addressEmployee);
    });
    let addressSociety = this.state.societyMapData.address;
    const body = {
      employee: allEmployeeData,
      society: addressSociety
    };
    axios({
      method: "post",
      url: "http://localhost:8080/geolocation/employee",
      data: body
    })
      .then(result => {
        if (result.status !== 200) {
          this.alertFunctionProblem();
        } else {
          this.setState({ employeeIsSend: true });
        }
      })
      .catch(error => {
        this.alertFunctionError();
      });
  };

  sendSocietyDataToServer = () => {
    const body = this.state.societyMapData;
    axios({
      method: "post",
      url: "http://localhost:8080/geolocation/society",
      data: body
    })
      .then(result => {
        if (result.status !== 200) {
          this.alertFunctionProblem();
        } else {
          this.setState({
            societyIsSend: true
          });
        }
      })
      .catch(error => {
        this.alertFunctionError();
      });
  };

  sendDataToServer = () => {
    this.sendSocietyDataToServer();
    this.sendEmployeeDataToServer();
  };

  render() {
    return (
      <div className="text-white">
        <div className="listAddress mt-2">
          <Container>
            <Row>
              <Col lg={{ size: 2 }}>
                <button
                  className="mt-2 btn text-white"
                  onClick={this.backToHome}
                >
                  <i className="fa fa-home" /> Revenir à l'accueil
                </button>
              </Col>
              <Col lg={{ size: 8 }}>
                <h1>
                  <b>Géolocaliser vos salariés</b>
                </h1>
                <NotificationAlert ref="notificationAlertError" />
                <NotificationAlert ref="notificationAlertErrorLimit" />
                <NotificationAlert ref="notificationAlertProblem" />
              </Col>
            </Row>
          </Container>
          <Container className="card shadow p-3 mt-5 mb-5">
            <Row>
              <Col md={{ size: 5, offset: 1 }}>
                <h5 className="text-left">
                  <img
                    alt="step 1"
                    src="./img/1-circle.png"
                    className="mr-2 ml-2"
                    width="50"
                    height="50"
                  />
                  Renseigner l'adresse du lieu de travail :
                </h5>
                {this.state.isChecked === false ? (
                  <form
                    onSubmit={this.handleSubmitSocietyAddress}
                    className="mt-3"
                  >
                    <Col md={{ size: 9, offset: 1 }}>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="nbSociety"
                        id="inputNbSociety"
                        onChange={this.handleChange}
                        placeholder="N°"
                      />
                    </Col>
                    <Col md={{ size: 9, offset: 1 }}>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="streetSociety"
                        id="inputStreetSociety"
                        onChange={this.handleChange}
                        placeholder="Nom de rue"
                      />
                    </Col>
                    <Col md={{ size: 9, offset: 1 }}>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="zipCodeSociety"
                        id="inputZipCodeSociety"
                        onChange={this.handleChange}
                        placeholder="Code postal"
                      />
                    </Col>
                    <Col md={{ size: 9, offset: 1 }}>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="citySociety"
                        id="inputCitySociety"
                        onChange={this.handleChange}
                        placeholder="Ville"
                      />
                    </Col>
                    <Col md={{ size: 6, offset: 2 }}>
                      <button className="btn saveButton mt-3 mb-1">
                        Enregistrer <i className="fa fa-map-marker" />
                      </button>
                    </Col>
                  </form>
                ) : (
                  <div className="successMsg shadow">
                    L'adresse de l'entreprise a bien été géolocalisée{" "}
                    <i className="fa fa-check-circle" />
                  </div>
                )}
              </Col>
              <div className="separator mr-5" />
              <Col md={{ size: 5 }}>
                <h5>
                  <img
                    alt="step 2"
                    src="./img/2-circle.png"
                    className="mr-2"
                    width="50"
                    height="50"
                  />
                  Importer les adresses de vos salariés :
                </h5>
                <div>
                  {this.state.addressEmployeeToTable !== undefined ? (
                    <div>
                      <div className="importAddress mt-3">
                        <CsvToHtmlTable
                          data={this.state.addressEmployeeToTable}
                          csvDelimiter=","
                          tableClassName="table table-striped table-hover"
                          hasHeader={false}
                        />
                      </div>
                      <Col lg={{ size: 6, offset: 6 }}>
                        <p className="totalAddresses pt-1 pl-1">
                          <b>{this.state.employeeMapData.length}</b> adresse
                          {this.state.employeeMapData.length <= 1
                            ? " importée"
                            : "s importées"}{" "}
                          <i className="fa fa-check" />
                        </p>
                      </Col>
                    </div>
                  ) : (
                    <div>
                      <ReactFileReader
                        fileTypes={[".csv"]}
                        handleFiles={this.handleFiles}
                      >
                        <button className="btn importButton mt-3">
                          <i className="fa fa-upload" /> Importer mon fichier{" "}
                        </button>
                      </ReactFileReader>
                      <span className="titleExample">
                        Merci de suivre cet exemple pour l'import de votre
                        fichier CSV
                      </span>
                      <img
                        src="https://www.motorradreifendirekt.de/_ui/desktop/common/mctshop/images/icons/info-icon.png"
                        alt="infoIcon"
                        width="25"
                        height="25"
                        className="ml-2"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Fichier informatique de type tableur (Excel) avec une extension .csv"
                      />
                      <table className="mt-3 table table-striped csvExample">
                        <tbody>
                          <tr>
                            <td>50</td>
                            <td>rue de Provence</td>
                            <td>59000</td>
                            <td>Lille</td>
                          </tr>
                          <tr>
                            <td>3 B</td>
                            <td>boulevard Vauban</td>
                            <td>59000</td>
                            <td>Lille</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={{ size: 10, offset: 1 }}>
                <h5 className="mt-4">
                  <img
                    alt="step 1"
                    src="./img/3-circle.png"
                    className="mr-2"
                    width="50"
                    height="50"
                  />
                  Analyser la distance et les temps de trajets en voiture et à
                  vélo :
                </h5>
              </Col>
            </Row>
            <Row>
              <Col lg={{ size: 4, offset: 4 }}>
                {this.state.societyIsSend === true &&
                this.state.employeeIsSend === true ? (
                  <p>
                    <b>
                      Vos données ont bien été enregistrées, vous recevrez les
                      résultats par e-mail sous ((estimation temps))
                    </b>
                  </p>
                ) : (
                  <button
                    className="btn text-white mb-4 mt-4"
                    onClick={this.sendDataToServer}
                  >
                    Lancer la géolocalisation
                  </button>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Geolocalisation;
