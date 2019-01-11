import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/ListeAdresses.css";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";

class ListeAdresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressData: undefined
    };
  }

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
        <HeaderRH />
        <div className="listeAdresses mt-2">
          <h3>Géolocaliser vos salariés</h3>
          <div className="container mt-3">
            <div className="row">
              <p className="text-justify ml-5 mr-5">
                Lorem ipsum sit amet dolor lorem ipsum sit amet dolor, lorem
                ipsum sit amet dolor Lorem ipsum sit amet dolor lorem ipsum sit
                amet dolor, lorem ipsum sit amet dolor Lorem ipsum sit amet
                dolor lorem ipsum sit amet dolor.
              </p>
            </div>
            <ReactFileReader
              fileTypes={[".csv"]}
              handleFiles={this.handleFiles}
            >
              <button className="btn btn-primary mb-3">
                Importer un fichier CSV d'adresses postales
              </button>
            </ReactFileReader>
            <CsvToHtmlTable
              data={this.state.addressData}
              csvDelimiter=","
              tableClassName="table table-striped table-hover"
              hasHeader={false}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ListeAdresses;
