import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Col } from "reactstrap";
import "./App.css";
import Accueil from "./components/Accueil";
import Inscription from "./components/Inscription";
import Connexion from "./components/Connexion";
import Contact from "./components/Contact";
import EspaceRH from "./components/EspaceRH";
import NouvelleEnquete from "./components/NouvelleEnquete";
import ListeEnquetesRH from "./components/ListeEnquetesRH";
import Geolocalisation from "./components/Geolocalisation";
import Sondage from "./components/Sondage";
import Resultat from "./components/Resultat";
import Assistance from "./components/Assistance";
import EspaceAdmin from "./components/EspaceAdmin";
import ListeEntreprises from "./components/ListeEntreprises";
import ListeEnquetes from "./components/ListeEnquetes";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Col lg={{ size: 8, offset: 2 }}>
          <p className="homeSlogan">
            MOUV'R : Enquête de mobilité pour vos salariés
          </p>
        </Col>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Accueil} />
            <Route path="/inscription" component={Inscription} />
            <Route path="/connexion" component={Connexion} />
            <Route path="/contact" component={Contact} />
            <Route path="/monespace" component={EspaceRH} />
            <Route path="/nouvelleenquete" component={NouvelleEnquete} />
            <Route path="/listeenquetesrh" component={ListeEnquetesRH} />
            <Route path="/geolocalisation" component={Geolocalisation} />
            <Route path="/sondage" component={Sondage} />
            <Route path="/resultat" component={Resultat} />
            <Route path="/assistance" component={Assistance} />
            <Route path="/admin" component={EspaceAdmin} />
            <Route path="/listeentreprises" component={ListeEntreprises} />
            <Route path="/listeenquetes" component={ListeEnquetes} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
