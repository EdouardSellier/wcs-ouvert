import React, { Component } from "react";
import APIGeoloc from "./APIGeoloc";
import { Container, Row, Col } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";
import NotificationAlert from "react-notification-alert";
import ReactFileReader from "react-file-reader";
import axios from "axios";
import csv from "csv";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import ScrollAnimation from "react-animate-on-scroll";
import "./css/Geolocalisation.css";
import { urlBackEnd } from "../conf";


const errorSocietyAddress = {
  place: "tr",
  message:
    "Nous avons rencontré un problème avec votre adresse postale, merci de vérifier les champs",
  type: "danger",
  autoDismiss: 4
};

const errorLimitMsg = {
  place: "tr",
  message:
    "Vous avez dépassé la limite des 1000 salariés, nous vous invitons à contacter l'assistance. Merci de votre compréhension.",
  type: "danger",
  autoDismiss: 4
};

const errorOnSubmit = {
  place: "tr",
  message:
    "Nous avons rencontré un problème lors de l'enregistrement de vos données, nous vous remercions de bien vouloir recommencer dans quelques instants ou de contacter l'assistance.",
  type: "danger",
  autoDismiss: 4
};

const errorListAddress = {
  place: "tr",
  message:
    "Nous avons rencontré un problème lors de la récupération de vos données, nous vous remercions de bien vouloir recommencer dans quelques instants ou de contacter l'assistance.",
  type: "danger",
  autoDismiss: 4
};

const errorDisplayResult = {
  place: "tr",
  message:
    "Nous avons rencontré un problème lors de l'affichage de vos résultats, nous vous remercions de bien vouloir recommencer dans quelques instants ou de contacter l'assistance.",
  type: "danger",
  autoDismiss: 4
};

class Geolocalisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeMapData: [],
      lengthEmployee: undefined,
      societyMapData: "",
      societyAddress: "",
      societyLat: "",
      societyLng: "",
      isChecked: false,
      addressEmployeeToTable: undefined,
      societyIsSend: false,
      employeeIsSend: false,
      pdfIsLoading: false,
      isReady: false,
      displayMap: false,
      addressReady: [],
      ready: "",
      notReady: "",
      employeePosition: [],
      employeeStats: [],
      societyPosition: [],
      isochrone5_auto: undefined,
      isochrone10_auto: undefined,
      isochrone20_auto: undefined,
      isochrone5_cycle: undefined,
      isochrone10_cycle: undefined,
      isochrone15_cycle: undefined
    };
  }

  alertFunctionError = error => {
    this.refs.notificationAlertError.notificationAlert(error);
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
        const userId = localStorage.getItem("id");
        let allSocietyData = {
          address: dataStr,
          lat: latSociety,
          lng: lngSociety,
          user_id: userId
        };
        this.setState({
          societyMapData: allSocietyData,
          isChecked: true
        });
      })
      .catch(error => {
        this.alertFunctionError(errorSocietyAddress);
      });
  };

  handleFiles = files => {
    const reader = new FileReader();
    reader.onload = e => {
      csv.parse(reader.result, (err, data) => {
        if (data.length < 1000) {
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
        } else {
          this.alertFunctionError(errorLimitMsg);
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
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const body = {
      employee: allEmployeeData,
      society: addressSociety,
      user_id: userId
    };
    axios({
      method: "post",
      url: `${urlBackEnd}/user/geolocation/employee`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.status !== 200) {
          this.alertFunctionError(errorOnSubmit);
        } else {
          this.setState({ employeeIsSend: true });
        }
      })
      .catch(error => {
        this.alertFunctionError(errorOnSubmit);
      });
  };

  sendSocietyDataToServer = () => {
    const body = this.state.societyMapData;
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: `${urlBackEnd}/user/geolocation/society`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.status !== 200) {
          this.alertFunctionError(errorOnSubmit);
        } else {
          this.setState({
            societyIsSend: true
          });
        }
      })
      .catch(error => {
        this.alertFunctionError(errorOnSubmit);
      });
  };

  sendDataToServer = () => {
    this.sendSocietyDataToServer();
    this.sendEmployeeDataToServer();
  };

  getAddressesFromDb = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const body = {
      user_id: userId
    };
    axios({
      method: "post",
      url: `${urlBackEnd}/user/geolocation/list`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        let allData = result.data;
        let allAddresses = this.state.addressReady;
        allData.map(data => {
          return allAddresses.push(data);
        });
        this.setState({
          addressReady: allAddresses
        });
      })
      .catch(error => {
        this.alertFunctionError(errorListAddress);
      });
  };

  displayResults = address => {
    const token = localStorage.getItem("token");
    let addressSociety = address.split(":");
    const userId = localStorage.getItem("id");
    const body = {
      user_id: userId,
      address: addressSociety.slice(0, 1)
    };
    axios({
      method: "post",
      url: `${urlBackEnd}/user/geolocation/results`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.data === "In progress") {
          this.setState({
            notReady:
              "Les résultats ne sont pas encore prêts, merci d'attendre l'e-mail de confirmation",
            displayMap: false
          });
        } else {
          let employeeMapData = result.data.employeeData;
          let societyMapData = result.data.societyData;
          let lengthEmployee = result.data.employeeLength;
          let employeesMarkers = this.state.employeePosition;
          employeeMapData.position.map(position => {
            let positionInArray = position.split(",");
            let lat = parseFloat(positionInArray[0]);
            let lng = parseFloat(positionInArray[1]);
            return employeesMarkers.push([lat, lng]);
          });
          let employeeStats = {
            distance: employeeMapData.distance,
            duration: employeeMapData.duration
          };
          this.setState({
            employeePosition: employeesMarkers,
            employeeStats: employeeStats,
            societyPosition: [societyMapData.lat, societyMapData.lng],
            isochrone5_auto: societyMapData.isochrone5_auto,
            isochrone10_auto: societyMapData.isochrone10_auto,
            isochrone20_auto: societyMapData.isochrone20_auto,
            isochrone5_cycle: societyMapData.isochrone5_cycle,
            isochrone10_cycle: societyMapData.isochrone10_cycle,
            isochrone15_cycle: societyMapData.isochrone15_cycle,
            displayMap: true,
            isReady: true,
            lengthEmployee: lengthEmployee
          });
        }
      })
      .catch(error => {
        this.alertFunctionError(errorDisplayResult);
      });
  };

  componentDidMount = () => {
    this.getAddressesFromDb();
  };

  handleImg = () => {
    const capture1 = document.querySelector("#capture1");
    const capture2 = document.querySelector("#capture2");
    let allCaptures = [];
    allCaptures.push(capture1, capture2);
    let allImagesData = [];
    this.setState({
      pdfIsLoading: true
    });
    allCaptures.map(capture => {
      return domtoimage.toPng(capture).then(dataUrl => {
        let imgData = new Image();
        if (capture.clientHeight > 900) {
          imgData = new Image(180, 180);
        } else {
          imgData = new Image(180, 100);
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
    let newPdf = new jsPDF();
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
      this.setState({
        pdfIsLoading: false
      });
    }
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
                <NotificationAlert ref="notificationAlertErrorAddress" />
                <NotificationAlert ref="notificationAlertErrorResult" />
                <NotificationAlert ref="notificationAlertProblem" />
              </Col>
            </Row>
          </Container>
          <Container className="card shadow p-3 mt-5 mb-lg-5">
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
              <div className="separator mr-lg-5" />
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
                          <i className="fa fa-upload" /> Importer mon fichier
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
                      Vos données ont bien été enregistrées, vous recevrez un
                      e-mail une fois l'analyse terminée.
                    </b>
                  </p>
                ) : (
                  <button
                    className="btn text-white mb-4 mt-4"
                    onClick={this.sendDataToServer}
                  >
                    Lancer la géolocalisation <i className="fa fa-map" />
                  </button>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={{ size: 12 }}>
                <hr />
              </Col>
            </Row>
            <ScrollAnimation animateIn="fadeIn">
              <Row className="mt-4 mb-4">
                <Col lg={{ size: 12 }}>
                  <h5>
                    <img
                      alt="step 1"
                      src="./img/4-circle.png"
                      className="mr-2"
                      width="50"
                      height="50"
                    />
                    Sélectionner une adresse et consulter les résultats
                  </h5>
                  <select
                    className="mt-3"
                    onChange={e => {
                      this.displayResults(e.target.value);
                    }}
                  >
                    <option>Sélectionner une adresse</option>
                    {this.state.addressReady.map(address => {
                      let isReady = "";
                      if (address.is_ready === 1) {
                        isReady = "Terminée";
                      } else {
                        isReady = "En cours";
                      }
                      return (
                        <option
                          key={address.address}
                          //onChange={() => {
                          //  this.displayResults(address.address);
                          //}}
                        >
                          {address.address} : {isReady}
                        </option>
                      );
                    })}
                  </select>
                  {this.state.displayMap === false ? (
                    <p className="mt-3">
                      <b>{this.state.notReady}</b>
                    </p>
                  ) : (
                    <div className="mt-4">
                      <img
                        src="./img/arrow-down.png"
                        alt="down"
                        height="90"
                        width="90"
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </ScrollAnimation>
          </Container>
          {this.state.displayMap === true ? (
            <div>
              <hr />
              <ScrollAnimation animateIn="fadeIn">
                <Container className="card shadow mt-5">
                  <div id="capture1" className="m-3">
                    <APIGeoloc
                      icon="fa fa-car"
                      legendTitle="Distance en voiture"
                      measure="km"
                      mapTitle="Analyse de la distance en voiture"
                      employeesPositions={this.state.employeePosition}
                      employeeStats={this.state.employeeStats}
                      societyPosition={this.state.societyPosition}
                      firstPolygon={this.state.isochrone5_auto}
                      secondPolygon={this.state.isochrone10_auto}
                      thirdPolygon={this.state.isochrone20_auto}
                      isReady={this.state.isReady}
                      lengthEmployee={this.state.lengthEmployee}
                    />
                  </div>
                </Container>
              </ScrollAnimation>
              <ScrollAnimation animateIn="fadeIn">
                <Container className="card shadow mt-5">
                  <div id="capture2" className="m-3">
                    <APIGeoloc
                      icon="fa fa-bicycle"
                      legendTitle="Durée du trajet à vélo"
                      measure=" minutes "
                      mapTitle="Analyse du temps de trajet à vélo"
                      employeesPositions={this.state.employeePosition}
                      employeeStats={this.state.employeeStats}
                      societyPosition={this.state.societyPosition}
                      firstPolygon={this.state.isochrone5_cycle}
                      secondPolygon={this.state.isochrone10_cycle}
                      thirdPolygon={this.state.isochrone15_cycle}
                      isReady={this.state.isReady}
                      lengthEmployee={this.state.lengthEmployee}
                    />
                  </div>
                </Container>
              </ScrollAnimation>
              <hr className="mt-5 mb-4" />
              <ScrollAnimation animateIn="fadeIn">
                <div>
                  <h4>
                    <img
                      alt="step 1"
                      src="./img/5-circle.png"
                      className="mr-2"
                      width="40"
                      height="40"
                    />
                    <b>Enregistrer votre compte-rendu :</b>
                  </h4>
                  <button
                    onClick={this.handleImg}
                    className="mb-4 mt-3 btn text-white pdfButton"
                  >
                    <i className="fa fa-file-pdf-o" /> Télécharger PDF
                  </button>
                  {this.state.pdfIsLoading === true ? (
                    <img
                      src="./img/spinner.png"
                      className="spinnerLogo ml-3 mb-3"
                      alt="spinner"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </ScrollAnimation>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Geolocalisation;
