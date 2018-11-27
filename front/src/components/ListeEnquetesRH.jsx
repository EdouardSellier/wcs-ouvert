import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/ListeEnquetesRH.css";

class ListeEnquetesRH extends Component {
  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="listeEnquetesRH mt-2">
          <h4>Liste des enquêtes de mon entreprise</h4>
          <table className="table mt-5 mb-5">
            <tbody>
              <tr>
                <td>Enquête 1</td>
              </tr>
              <tr>
                <td>Enquête 2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ListeEnquetesRH;
