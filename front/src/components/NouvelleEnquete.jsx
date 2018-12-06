import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/NouvelleEnquete.css";
import { Container, Row, Col } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailsData: undefined
    };
  }

  handleFiles = files => {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({
        mailsData: reader.result
      });
    };
    reader.readAsText(files[0]);
  };

  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="nouvelleEnquete mt-2">
          <h3>Commencer une nouvelle enquête</h3>
          <Container>
            <Row className="mt-4 mb-3">
              <Col md={{ size: 10, offset: 1 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non,
                ipsam deleniti adipisci dolores dolorem voluptates ipsum quaerat
                libero asperiores voluptate, numquam, veritatis accusamus veniam
                magnam dolorum odio aliquam culpa! Natus.
              </Col>
            </Row>
            <form>
              <Row>
                <Col md={{ size: 6, offset: 3 }}>
                  <label>Nom de l'enquête</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNomEnquete"
                    placeholder="Société X Lille"
                  />
                </Col>
              </Row>
              <label>Adresse du lieu de travail</label>
              <Row>
                <Col md={{ size: 4 }}>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNom"
                    placeholder="N° de rue"
                  />
                </Col>
                <Col md={{ size: 2 }}>
                  <select>
                    <option>Complément</option>
                    <option>Bis</option>
                    <option>Ter</option>
                  </select>
                </Col>
                <Col md={{ size: 6 }}>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPrenom"
                    placeholder="Nom de rue"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 6 }}>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="inputCodePostal"
                    placeholder="Code postal"
                  />
                </Col>
                <Col md={{ size: 6 }}>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="inputVille"
                    placeholder="Ville"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 8, offset: 2 }}>
                  <label>Importer les adresses e-mail de mes salariés</label>
                  <ReactFileReader
                    fileTypes={[".csv"]}
                    handleFiles={this.handleFiles}
                  >
                    <input
                      className="btn text-white mb-3"
                      defaultValue=" Importer un fichier CSV d'adresses e-mail"
                    />
                  </ReactFileReader>
                  <div className="card importMails">
                    <CsvToHtmlTable
                      data={this.state.mailsData}
                      csvDelimiter="    "
                      tableClassName="table table-striped table-hover"
                      hasHeader={false}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 4, offset: 4 }}>
                  <label>Date butoir pour l'enquête</label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputNomEnquete"
                  />
                </Col>
              </Row>
              <button className="btn text-white mt-4 mb-3">
                Créer mon enquête
              </button>
            </form>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
