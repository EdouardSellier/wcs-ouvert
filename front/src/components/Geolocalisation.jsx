import React, { Component } from "react";
import Footer from "./Footer";
import "./css/Geolocalisation.css";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";
import { Container, Row, Col } from "reactstrap";

class Geolocalisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressData: undefined
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  handleFiles = files => {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({
        addressData: reader.result
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
              <p className="text-justify m-5">
                Lorem ipsum sit amet dolor lorem ipsum sit amet dolor, lorem
                ipsum sit amet dolor Lorem ipsum sit amet dolor lorem ipsum sit
                amet dolor, lorem ipsum sit amet dolor Lorem ipsum sit amet
                dolor lorem ipsum sit amet dolor.
              </p>
            </Row>
            <ReactFileReader
              fileTypes={[".csv"]}
              handleFiles={this.handleFiles}
            >
              <button className="btn text-white mb-3">
                Importer un fichier CSV d'adresses postales
              </button>
            </ReactFileReader>
            <div className="card importAddress">
              <CsvToHtmlTable
                data={this.state.addressData}
                csvDelimiter=","
                tableClassName="table table-striped table-hover"
                hasHeader={false}
              />
            </div>
            <button className="btn text-white mt-4 mb-3">
              Géolocaliser mes salariés
            </button>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Geolocalisation;
