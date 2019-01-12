import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Accueil from "./components/Accueil";
import Footer from "./components/Footer";
import EspaceRH from "./components/EspaceRH";
import NouvelleEnquete from "./components/NouvelleEnquete";
import ListeEnquetesRH from "./components/ListeEnquetesRH";
import Geolocalisation from "./components/Geolocalisation";
import SondageRH from "./components/SondageRH";
import Sondage from "./components/Sondage";
import Resultat from "./components/Resultat";
import Assistance from "./components/Assistance";
import EspaceAdmin from "./components/EspaceAdmin";
import ListeEntreprises from "./components/ListeEntreprises";
import ListeEnquetes from "./components/ListeEnquetes";
import ListeGeoloc from "./components/ListeGeoloc";
import SondageRH from "./components/SondageRH";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (authChecker.getUser() &&
        authChecker.isAdmin() === "1" &&
        authChecker.hasPaid() === "0") ||
      authChecker.hasPaid() === "1" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
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
      authChecker.hasPaid() === "1" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
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
  hasPaid() {
    return localStorage.getItem("has_paid") || null;
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Accueil} />
            <Route path="/sondage" component={Sondage} />
            <UserRoute path="/monespace" component={EspaceRH} />
            <UserRoute path="/monespace" component={EspaceRH} />
            <UserRoute path="/nouvelleenquete" component={NouvelleEnquete} />
            <UserRoute path="/listeenquetesrh" component={ListeEnquetesRH} />
            <UserRoute path="/geolocalisation" component={Geolocalisation} />
            <UserRoute path="/sondage/:token" component={Sondage} />
            <UserRoute path="/assistance" component={Assistance} />
            <UserRoute path="/resultat" component={Resultat} />
            <UserRoute path="/sondageRH" component={SondageRH} />

            <AdminRoute path="/admin" component={EspaceAdmin} />
            <AdminRoute path="/listeentreprises" component={ListeEntreprises} />
            <AdminRoute path="/listeenquetes" component={ListeEnquetes} />
            <AdminRoute path="/listegeoloc" component={ListeGeoloc} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
