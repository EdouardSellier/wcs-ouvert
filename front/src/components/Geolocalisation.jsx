import React, { Component } from "react";
import Footer from "./Footer";
import APIGeoloc from "./APIGeoloc";
import "./css/Geolocalisation.css";
import { Container, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";
import axios from "axios";
import csv from "csv";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

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
      addressEmployeeToTable: undefined,
      addressEmployeeToArray: [],
      isochroneCenter: [],
      mapData: [],
      addressSocietyToLatLng: [],
      nbSociety: "",
      streetSociety: "",
      zipCodeSociety: "",
      citySociety: "",
      isChecked: false,
      pdfIsLoading: false
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
        if (data.length < 800) {
          this.setState({
            addressEmployeeToArray: data,
            addressEmployeeToTable: reader.result
          });
        } else {
          this.alertFunctionErrorLimit();
        }
      });
    };
    reader.readAsText(files[0]);
  };

  handleImg = () => {
    const capture1 = document.querySelector("#capture1");
    const capture2 = document.querySelector("#capture2");
    let allCaptures = [];
    allCaptures.push(capture1, capture2);
    let allImagesData = [];
    allCaptures.map(capture => {
      return domtoimage.toPng(capture).then(dataUrl => {
        let imgData = new Image();
        if (capture.clientHeight > 800) {
          imgData = new Image(180, 180);
        } else {
          imgData = new Image(180, 110);
        }
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
    this.setState({
      pdfIsLoading: true
    });
    setTimeout(() => {
      this.setState({
        pdfIsLoading: false
      });
    }, 3000);
    let newPdf = new jsPDF();
    newPdf.text(15, 15, "Compte-rendu de la géolocalisation de vos salariés :");
    newPdf.setFontSize(30);
    const allImages = this.state.imgData.reverse();
    allImages.map(image => {
      if (image.height >= 180) {
        newPdf.addImage(image, "JPEG", 5, 30, 200, 180);
      } else if (image.height < 180) {
        newPdf.addImage(image, "JPEG", 5, 30, 200, 130);
      }
      return newPdf.addPage();
    });
    let lastPage = newPdf.internal.getNumberOfPages();
    newPdf.deletePage(lastPage);
    if (allImages.length === 2) {
      newPdf.save("compte-rendu.pdf");
    }
  };

  render() {
    const addressEmployees = this.state.addressEmployeeToArray;
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
                  onClick={this.backToHome}
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
              <NotificationAlert ref="notificationAlertError" />
              <NotificationAlert ref="notificationAlertErrorLimit" />
              <NotificationAlert ref="notificationAlertProblem" />
              <p className="text-justify m-4">
                Cette page vous permet de géolocaliser vos salariés. Grâce à
                cela, vous connaîtrez entre autres la distance domicile –
                travail moyenne que parcourent vos salariés, et la part d’entre
                eux pouvant se rendre sur leur lieu de travail en vélo.
                <br /> Pour géolocaliser vos salariés, il vous suffit de suivre
                les étapes numérotées ci-dessous.
              </p>
            </Row>
          </Container>
          <Row>
            <Col md={{ size: 5, offset: 1 }}>
              <Row>
                <h5 className="mt-4">
                  <img
                    alt="step 1"
                    src="./img/1-circle.png"
                    className="mr-2"
                    width="50"
                    height="50"
                  />
                  Renseigner l'adresse du lieu de travail :
                </h5>
              </Row>
              {this.state.isChecked === false ? (
                <form onSubmit={this.handleSubmitSocietyAddress}>
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
                      <button className="btn saveButton mt-3 mb-3">
                        Enregistrer <i className="fa fa-map-marker" />
                      </button>
                    </Col>
                  </Row>
                </form>
              ) : (
                <div className="successMsg shadow">
                  L'adresse de l'entreprise a bien été géolocalisée{" "}
                  <i className="fa fa-check-circle" />
                </div>
              )}
            </Col>
            <div className="separator" />
            <Col md={{ size: 5 }} className="mt-4 ml-2">
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
                        <b>{this.state.addressEmployeeToArray.length}</b>{" "}
                        adresse
                        {this.state.addressEmployeeToArray.length <= 1
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
                      <button className="btn importButton mb-3 mt-3">
                        <i className="fa fa-upload" /> Importer mon fichier{" "}
                      </button>
                    </ReactFileReader>
                    <span className="titleExample">
                      Merci de suivre cet exemple pour l'import de votre fichier
                      CSV
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
                    <table className=" mt-3 table table-striped csvExample">
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
          <hr />
          <h5>
            {" "}
            <img
              alt="step 1"
              src="./img/3-circle.png"
              className="mr-2"
              width="50"
              height="50"
            />
            Analyser la distance et les temps de trajets en voiture et à vélo :
          </h5>
          <div id="capture1" className="m-3">
            <APIGeoloc
              addressEmployees={addressEmployees}
              addressSociety={addressSociety}
              profile="driving-car"
              rangeType="distance"
              range="5000,10000,15000"
              parameter="en voiture"
              legendTitle="Distance"
              measure="km"
              statTitle="Distance"
              icon="fa fa-car"
            />
          </div>
          <div id="capture2" className="m-3">
            <APIGeoloc
              addressEmployees={addressEmployees}
              addressSociety={addressSociety.reverse()}
              profile="cycling-regular"
              rangeType="time"
              range="300,600,900"
              parameter="à vélo"
              legendTitle="Durée du trajet"
              measure=" minutes "
              statTitle="Temps de trajet"
              icon="fa fa-bicycle"
            />
          </div>
        </div>
        <hr />
        <h5>
          <img
            alt="step 1"
            src="./img/4-circle.png"
            className="mr-2"
            width="50"
            height="50"
          />
          Enregistrer votre compte-rendu :
        </h5>
        <button
          onClick={this.handleImg}
          className="mb-4 mt-3 btn text-white pdfButton"
        >
          <i className="fa fa-file-pdf-o" /> Télécharger PDF
        </button>
        {this.state.pdfIsLoading === true ? (
          <img
            src="./img/Spinner.gif"
            alt="Chargement..."
            width="60"
            height="60"
            className="mb-3"
          />
        ) : (
          ""
        )}
        <Footer />
      </div>
    );
  }
}

export default Geolocalisation;
