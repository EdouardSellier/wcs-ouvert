import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./ListeDiffusion.css";
import { CsvToHtmlTable } from "react-csv-to-table";
import ReactFileReader from "react-file-reader";

class ListeDiffusion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailsData: undefined
    };
  }

  handleFiles = files => {
    var reader = new FileReader();
    reader.onload = e => {
      this.setState({
        mailsData: reader.result
      });
    };
    reader.readAsText(files[0]);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/sondage");
  };

  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="listeDiffusion mt-2">
          <h3>Liste de diffusion</h3>
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
                Importer un fichier CSV d'adresses e-mail
              </button>
            </ReactFileReader>
            <CsvToHtmlTable
              data={this.state.mailsData}
              csvDelimiter="    "
              tableClassName="table table-striped table-hover"
              hasHeader={false}
            />
            <button
              className="btn btn-primary mt-3 mb-3"
              onClick={this.handleSubmit}
            >
              Consulter le sondage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ListeDiffusion;
