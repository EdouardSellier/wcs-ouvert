import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
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

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authChecker.getUser() &&
      authChecker.isAdmin() === "1" &&
      authChecker.hasPayed() === "0" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/connexion"
          }}
        />
      )
    }
  />
);

const UserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authChecker.getUser() &&
      authChecker.isAdmin() === "0" &&
      authChecker.hasPayed() === "1" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/connexion",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const authChecker = {
  getUser() {
    return localStorage.getItem("currentUser") || null;
  },
  isAdmin() {
    return localStorage.getItem("is_admin") || null;
  },
  hasPayed() {
    return localStorage.getItem("has_payed") || null;
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Accueil} />
            <Route path="/inscription" component={Inscription} />
            <Route path="/connexion" component={Connexion} />
            <Route path="/contact" component={Contact} />

            <UserRoute path="/monespace" component={EspaceRH} />
            <UserRoute path="/monespace" component={EspaceRH} />
            <UserRoute path="/nouvelleenquete" component={NouvelleEnquete} />
            <UserRoute path="/listeenquetesrh" component={ListeEnquetesRH} />
            <UserRoute path="/geolocalisation" component={Geolocalisation} />
            <UserRoute path="/sondage" component={Sondage} />
            <UserRoute path="/assistance" component={Assistance} />
            <UserRoute path="/resultat" component={Resultat} />

            <AdminRoute path="/admin" component={EspaceAdmin} />
            <AdminRoute path="/listeentreprises" component={ListeEntreprises} />
            <AdminRoute path="/listeenquetes" component={ListeEnquetes} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
