import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Accueil from "./components/Accueil";
import EspaceRH from "./components/EspaceRH";
import NouvelleEnquete from "./components/NouvelleEnquete";
import ListeEnquetesRH from "./components/ListeEnquetesRH";
import Geolocalisation from "./components/Geolocalisation";
import SondageRH from "./components/SondageRH";
import Resultat from "./components/Resultat";
import Assistance from "./components/Assistance";
import EspaceAdmin from "./components/EspaceAdmin";
import ListeEntreprises from "./components/ListeEntreprises";
import ListeEnquetes from "./components/ListeEnquetes";
import Sondage from "./components/Sondage";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Accueil} />
            <Route path="/monespace" component={EspaceRH} />
            <Route path="/nouvelleenquete" component={NouvelleEnquete} />
            <Route path="/listeenquetesrh" component={ListeEnquetesRH} />
            <Route path="/geolocalisation" component={Geolocalisation} />
            <Route path="/sondageRH" component={SondageRH} />
            <Route path="/resultat" component={Resultat} />
            <Route path="/assistance" component={Assistance} />
            <Route path="/admin" component={EspaceAdmin} />
            <Route path="/listeentreprises" component={ListeEntreprises} />
            <Route path="/listeenquetes" component={ListeEnquetes} />
            <Route path="/sondage" component={Sondage} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
