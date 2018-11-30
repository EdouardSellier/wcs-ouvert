import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/Sondage.css";

class Sondage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        "un seul mode de transport",
        "Voiture personnelle",
        "",
        null,
        null,
        null,
        null,
        "",
        "Tous les jours",
        "Oui, toujours"
      ],
      questionTwo: [],
      questionHeight: []
    };
  }

  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="sondage mt-2">
          <h3>Sondage</h3>
          <form className="mt-5">
            <label for="questionOne">
              De manière générale, pour vos déplacements domicile-travail,
              utilisez-vous :
            </label>
            <br />
            <select id="questionOne">
              <option>un seul mode de transport</option>
              <option>
                plusieurs modes de transport successivement dans un même trajet
              </option>
            </select>
            <br />
            {this.state.questions[0] === "un seul mode de transport" && (
              <div>
                <label for="questionTwo">
                  Quel est votre mode de transport habituel :
                </label>
                <br />
                <select id="questionTwo">
                  <option>Voiture personnelle</option>
                  <option>Voiture de fonction/service</option>
                  <option>Covoiturage</option>
                  <option>Train (RER,…)</option>
                  <option>Métro</option>
                  <option>Bus</option>
                  <option>Tramway</option>
                  <option>
                    Deux roues non motorisées dit transport doux (vélo,
                    trottinette, roller...)
                  </option>
                  <option>Deux roues motorisées (moto, scooter)</option>
                  <option>Marche à pied (ou course)</option>
                  <option>Autre</option>
                </select>
              </div>
            )}
            {this.state.questions[0] !== "un seul mode de transport" && (
              <div>
                <label for="questionTwo">
                  Quels sont vos modes de transport habituels par ordre de
                  priorité :
                </label>
                <br />
                Voiture personnelle :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Voiture personnelle"
                />
                <br />
                Voiture de fonction/service :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Voiture de fonction/service"
                />
                <br />
                Covoiturage :{" "}
                <input type="checkbox" id="questionTwo" name="Covoiturage" />
                <br />
                Train (RER,…) :{" "}
                <input type="checkbox" id="questionTwo" name="Train (RER,…)" />
                <br />
                Métro : <input type="checkbox" id="questionTwo" name="Métro" />
                <br />
                Bus : <input type="checkbox" id="questionTwo" name="Bus" />
                <br />
                Tramway :{" "}
                <input type="checkbox" id="questionTwo" name="Tramway" />
                <br />
                Deux roues non motorisées dit transport doux (vélo, trottinette,
                roller...) :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Deux roues non motorisées dit transport doux (vélo,
                    trottinette, roller...)"
                />
                <br />
                Marche à pied (ou course) :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Marche à pied (ou course)"
                />
                <br />
                Autre : <input type="checkbox" id="questionTwo" name="Autre" />
                <br />
                {this.state.questionTwo.map(res => (
                  <span className="text-success"> -> {res}</span>
                ))}
                <div>
                  <label for="questionThree">
                    Quel est celui dans lequel vous passez le plus de temps au
                    cours de votre trajet domicile-travail :
                  </label>
                  <br />
                  <select id="questionThree">
                    <option>Voiture personnelle</option>
                    <option>Voiture de fonction/service</option>
                    <option>Covoiturage</option>
                    <option>Train (RER,…)</option>
                    <option>Métro</option>
                    <option>Bus</option>
                    <option>Tramway</option>
                    <option>
                      Deux roues non motorisées dit transport doux (vélo,
                      trottinette, roller...)
                    </option>
                    <option>Deux roues motorisées (moto, scooter)</option>
                    <option>Marche à pied (ou course)</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>
            )}
            <span>Combien de temps (en minutes) mettez-vous pour :</span>
            <br />
            <label for="questionFore">L’aller (domicile-travail) :</label>
            <br />
            <input type="number" id="questionFore" />
            <br />
            <label for="questionFive">Le retour (travail-domicile) :</label>
            <br />
            <input type="number" id="questionFive" />
            <br />
            <label for="questionSix">
              Quelle distance (en kms) parcourez-vous pour le trajet
              domicile-travail ou travail-domicile ?
            </label>
            <br />
            <input type="number" id="questionSix" />
            <br />
            <label for="questionSeven">
              Combien vous coûtent (en euros) vos déplacements en moyenne pour
              aller travailler (par mois) ?
            </label>
            <br />
            <input type="number" id="questionSeven" />
            <br />
            <label for="questionHeight">
              Pour quelle(s) raison(s) avez-vous choisi votre mode de
              déplacement principal ?
            </label>
            <br />
            Pas d’obligation(s) particulière(s) :{" "}
            <input
              type="checkbox"
              id="questionHeight"
              name="Pas d’obligation(s) particulière(s)"
            />
            <br />
            Activité(s) personnelle(s) (loisirs, courses, …) :{" "}
            <input
              type="checkbox"
              id="questionHeight"
              name="Activité(s) personnelle(s) (loisirs, courses, …)"
            />
            <br />
            Accompagnement des enfants ou du conjoint :{" "}
            <input
              type="checkbox"
              id="questionHeight"
              name="Accompagnement des enfants ou du conjoint"
            />
            <br />
            Horaires (début matinal, sortie tardive) :{" "}
            <input
              type="checkbox"
              id="questionHeight"
              name="Horaires (début matinal, sortie tardive)"
            />
            <br />
            Déplacements professionnels :{" "}
            <input
              type="checkbox"
              id="questionHeight"
              name="Déplacements professionnels"
            />
            <br />
            Réseau des transports en commun mal desservi :{" "}
            <input
              type="checkbox"
              id="questionHeight"
              name="réseau des transports en commun mal desservi"
            />
            <br />
            {this.state.questionHeight.includes(
              "Pas d’obligation(s) particulière(s)"
            ) === false &&
              this.state.questionHeight.length > 0 && (
                <div>
                  <label for="questionNine" className="mt-2">
                    Cette contrainte est-elle régulière :
                  </label>
                  <br />
                  <select id="questionNine">
                    <option>Tous les jours</option>
                    <option>Trois à quatre fois par semaine</option>
                    <option>Une à deux fois par semaine</option>
                  </select>
                </div>
              )}
            <label for="questionTen" className="mt-2">
              Vous déplacez-vous à l’extérieur du site à la pause déjeuner
              (repas, courses…) ?
            </label>
            <br />
            <select id="questionTen">
              <option>Oui, toujours</option>
              <option>Oui, souvent (deux fois ou plus par semaine)</option>
              <option>Oui, rarement (deux fois par mois)</option>
              <option>Non, jamais</option>
            </select>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Sondage;
