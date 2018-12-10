import React, { Component } from "react";
import Footer from "./Footer";
import APIGeoloc from "./APIGeoloc";
import "./css/Geolocalisation.css";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";
import { Container, Row, Col } from "reactstrap";
import csv from "csv";

class Geolocalisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressDataToTable: undefined,
      addressDataToArray: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  handleFiles = files => {
    const reader = new FileReader();
    reader.onload = e => {
      csv.parse(reader.result, (err, data) => {
        this.setState({
          addressDataToArray: data
        });
      });
      this.setState({
        addressDataToTable: reader.result
      });
    };
    reader.readAsText(files[0]);
  };

  render() {
    const addressData = this.state.addressDataToArray;
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
            <div className="importAddress">
              {this.state.addressDataToTable !== undefined ? (
                <CsvToHtmlTable
                  data={this.state.addressDataToTable}
                  csvDelimiter=","
                  tableClassName="table table-striped table-hover"
                  hasHeader={false}
                />
              ) : (
                <div className="csvExample">
                  Exemple de fichier .csv
                  <table className=" mt-3 table table-striped ">
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
                  </table>
                </div>
              )}
              <CsvToHtmlTable
                data={this.state.addressDataToTable}
                csvDelimiter=","
                tableClassName="table table-striped table-hover"
                hasHeader={false}
              />
            </div>
          </Container>
          <APIGeoloc addressData={addressData} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Geolocalisation;
