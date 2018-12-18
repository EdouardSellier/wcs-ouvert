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
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

const successMsg = {
  place: "tr",
  message: (
    <p>
      L'adresse postale a bien été prise en compte pour la géolocalisation{" "}
      <i className="fa fa-check-circle-o" />
    </p>
  ),
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
      citySociety: "",
      allImagesToPdf: [],
      isChecked: false
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
    return axios
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
            citySociety: "",
            isChecked: true
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

  handleImg = () => {
    let capture1 = document.querySelector("#capture1");
    let capture2 = document.querySelector("#capture2");
    let capture3 = document.querySelector("#capture3");
    let allCaptures = [];
    allCaptures.push(capture1, capture2, capture3);
    let allImagesData = [];
    allCaptures.map(capture => {
      return domtoimage.toPng(capture).then(dataUrl => {
        let imgData = new Image();
        imgData.src = dataUrl;
        allImagesData.push(imgData);
        this.setState(
          {
            imgData: allImagesData
          },
          () => {
            this.handlePdf();
          }
        );
      });
    });
  };

  handlePdf = () => {
    let newPdf = new jsPDF("portrait", "mm", "a4");
    newPdf.text(15, 15, "Compte-rendu de la géolocalisation de vos salariés :");
    newPdf.setFontSize(40);
    let allImages = this.state.imgData;
    allImages.map(data => {
      newPdf.addImage(data, "JPEG", 5, 20, 200, 200);
      return newPdf.addPage("a4", "portrait");
    });
    let lastPage = newPdf.internal.getNumberOfPages();
    newPdf.deletePage(lastPage);
    if (allImages.length > 2) {
      newPdf.save("compte-rendu.pdf");
    }
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
                  <i className="fa fa-home" /> Revenir à l'accueil
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
                assumenda ad rerum molestiae!
              </p>
            </Row>
          </Container>
          <Row>
            <Col md={{ size: 5, offset: 1 }}>
              <Container className="">
                <form onSubmit={this.handleSubmitSocietyAddress}>
                  <Row>
                    <label>
                      <img
                        alt="step 1"
                        src="https://img.icons8.com/metro/1600/1-circle.png"
                        className="mr-2"
                        width="60"
                        height="60"
                      />
                      <b className="mt-5">
                        Renseigner l'adresse postale de l'entreprise :
                      </b>
                    </label>
                  </Row>
                  <Row>
                    <Col md={{ size: 8, offset: 1 }}>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="nbSociety"
                        id="inputNbSociety"
                        onChange={this.handleChange}
                        value={this.state.nbSociety}
                        placeholder="N°"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ size: 8, offset: 1 }}>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="streetSociety"
                        id="inputStreetSociety"
                        onChange={this.handleChange}
                        value={this.state.streetSociety}
                        placeholder="Nom de rue"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ size: 8, offset: 1 }}>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="zipCodeSociety"
                        id="inputZipCodeSociety"
                        onChange={this.handleChange}
                        value={this.state.zipCodeSociety}
                        placeholder="Code postal"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ size: 8, offset: 1 }}>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="citySociety"
                        id="inputCitySociety"
                        onChange={this.handleChange}
                        value={this.state.citySociety}
                        placeholder="Ville"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ size: 6, offset: 2 }}>
                      <button className="btn text-white saveButton mt-3 mb-3">
                        Enregistr{this.state.isChecked === true ? "é" : "er"}{" "}
                        {this.state.isChecked === true ? (
                          <i className="fa fa-check-circle" />
                        ) : (
                          ""
                        )}
                      </button>
                    </Col>
                  </Row>
                </form>
              </Container>
            </Col>
            <div className="separator" />
            <Col md={{ size: 5 }}>
              <Container className="ml-4 mt-4">
                <label>
                  <img
                    alt="step 2"
                    src="https://img.icons8.com/metro/1600/2-circle.png"
                    className="mr-2"
                    width="60"
                    height="60"
                  />
                  <b className="mt-5">
                    Importer les adresses postales de vos salariés :
                  </b>
                </label>
                <ReactFileReader
                  fileTypes={[".csv"]}
                  handleFiles={this.handleFiles}
                >
                  <button className="btn text-white importButton mb-3 mt-3">
                    <i className="fa fa-upload" /> Importer un fichier CSV{" "}
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
                        Merci de suivre cet exemple pour l'import de votre
                        fichier CSV
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
            </Col>
          </Row>
          <hr />
          <div id="capture1">
            <APIGeoloc
              addressEmployee={addressEmployee}
              addressSociety={addressSociety}
              profile="driving-car"
              rangeType="distance"
              range="5000,10000,15000"
              parameter="en voiture"
              distance="Distance"
              measure="km"
              zoom={11.4}
              id="capture1"
            />
          </div>
          <hr />
          <div id="capture2">
            <APIGeoloc
              addressEmployee={addressEmployee.reverse()}
              addressSociety={addressSociety.reverse()}
              profile="cycling-regular"
              rangeType="time"
              range="300,600,900"
              parameter="à vélo"
              distance="Durée du trajet"
              measure=" minutes "
              zoom={11.4}
              id="capture2"
            />
          </div>
          <hr />
          <div id="capture3">
            <APIGeoloc
              addressEmployee={addressEmployee}
              addressSociety={addressSociety}
              profile="foot-walking"
              rangeType="time"
              range="300,600,900"
              parameter="à pieds"
              distance="Durée du trajet"
              measure=" minutes "
              zoom={13}
              id="capture3"
            />
          </div>
        </div>
        <button
          onClick={() => {
            this.handleImg();
          }}
          className="m-3 btn text-white"
        >
          <i className="fa fa-file-pdf-o" /> Télécharger le compte-rendu
        </button>
        <Footer />
      </div>
    );
  }
}

export default Geolocalisation;
