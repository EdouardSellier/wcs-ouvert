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

const PrivateRoute = ({ component: Component, ...rest }) => (