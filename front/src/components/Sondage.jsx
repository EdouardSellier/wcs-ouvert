import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/Sondage.css";

class Sondage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* This states are usuless for the moment but let's keep them, just must modif them after.. */
      questions: ["", "", "", null, null, null, null, "", "", ""],
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
            {this.state.questions[0] !== "" && (
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
            <label for="questionFour">L’aller (domicile-travail) :</label>
            <br />
            <input type="number" id="questionFour" />
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
            {this.state.questionHeight.includes("") === false &&
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
              (repas, courses…) :
            </label>
            <br />
            <select id="questionTen">
              <option>Oui, toujours</option>
              <option>Oui, souvent (deux fois ou plus par semaine)</option>
              <option>Oui, rarement (deux fois par mois)</option>
              <option>Non, jamais</option>
            </select>
            <br />
            {/* Just to have a condition, the condition must be changed after */}
            {1 === true && (
              <div>
                <label for="questionEleven" className="mt-2">
                  En arrivant sur votre lieu de travail, trouvez-vous une
                  place :
                </label>
                <br />
                <select id="questionEleven">
                  <option>Très facilement</option>
                  <option>Facilement</option>
                  <option>Difficilement</option>
                  <option>Très difficilement</option>
                </select>
              </div>
            )}
            {1 === true && (
              <div>
                <label for="questionTwelve" className="mt-2">
                  Les trouvez-vous pratiques, accessibles ? (Oui/Non)
                </label>
                <br />
                <select id="questionTwelve">
                  <option>Oui</option>
                  <option>Non</option>
                </select>
                <br />
              </div>
            )}
            <label for="questionThirteen">
              Si votre mode de déplacement principal n’est pas disponible, vers
              quelle solution vous reportez-vous :
            </label>
            <br />
            <select id="questionThirteen">
              <option>Voiture personnelle</option>
              <option>Voiture de fonction/service</option>
              <option>Covoiturage</option>
              <option>Train (RER,…)</option>
              <option>Métro</option>
              <option>Bus</option>
              <option>Tramway</option>
              <option>
                Deux roues non motorisées dit transport doux (vélo, trottinette,
                roller...)
              </option>
              <option>Deux roues motorisées (moto, scooter)</option>
              <option>Marche à pied (ou course)</option>
              <option>Autre</option>
            </select>
            <br />
            <label for="questionFourteen">
              Combien de déplacements professionnels réalisez-vous en moyenne :
            </label>
            <br />
            <select id="questionFourteen">
              <option>Je ne fais jamais de déplacements professionnels</option>
              <option>Quelques fois par an</option>
              <option>1 à 2 fois par mois</option>
              <option>1 à 2 fois par semaine</option>
              <option>Plus de 2 fois par semaine</option>
            </select>
            <br />
            <label for="questionFifteen">
              Si vous utilisez votre voiture personnelle lors de ces
              déplacements, pour quelle(s) raison(s) :
            </label>
            <br />
            <select id="questionFifteen">
              <option>Pas d’autres solutions identifiées</option>
              <option>Confort</option>
              <option>Rapidité</option>
              <option>Flexibilité (si déplacement tôt ou tard)</option>
              <option>Aucune raison particulière</option>
            </select>
            <br />
            <label for="questionSixteen">
              Si AG2R LA MONDIALE propose des solutions alternatives en
              remplacement de votre voiture personnelle, seriez-vous intéressé :
            </label>
            <br />
            <select id="questionSixteen">
              <option>Oui pour chaque déplacement</option>
              <option>
                Oui, si j’ai la possibilité de rentrer chez moi avec
              </option>
              <option>Oui, de temps en temps</option>
              <option>Non, ma voiture m’apporte trop d’avantages</option>
            </select>
            <br />
            <label for="questionSeventeen">
              Quelle affirmation correspond le plus à vos habitudes de
              déplacements aujourd’hui pour vous rendre au travail :
            </label>
            <br />
            <select id="questionSeventeen">
              <option>
                Je connais des alternatives à la voiture individuelle, j’essaye
                de les utiliser lorsque c’est possible et j’envisage de les
                utiliser davantage
              </option>
              <option>
                Je connais des alternatives à la voiture individuelle mais je ne
                les ai pas encore mises en pratique
              </option>
              <option>
                Je ne connais pas suffisamment les différentes possibilités de
                me rendre au travail sans voiture
              </option>
              <option>
                J’utilise la voiture individuelle et  je n’ai malheureusement
                pas d’autres choix à l’heure actuelle
              </option>
              <option>
                J’utilise la voiture individuelle et je n’ai pas envie de
                changer mes habitudes de déplacements
              </option>
            </select>
            <br />
            <label for="questionEighteen">
              Quelles sont les mesures qui pourraient vous inciter à utiliser
              davantage les transports en commun ?
            </label>
            <br />
            des stations/arrêts plus proches de mon domicile{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="des stations/arrêts plus proches de mon domicile"
            />
            <br />
            des stations/arrêts plus proches de mon lieu de travail{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="des stations/arrêts plus proches de mon lieu de travail"
            />
            <br />
            Une meilleure prise en charge de l’abonnement{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="Une meilleure prise en charge de l’abonnement"
            />
            <br />
            Des fréquences de passage plus importantes{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="Des fréquences de passage plus importantes"
            />
            <br />
            Aucune mesure, je ne souhaite pas utiliser les transports en commun{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="Aucune mesure, je ne souhaite pas utiliser les transports en commun"
            />
            <br />
            Autre <input type="checkbox" id="questionEighteen" name="Autre" />
            <br />
            <label for="questionEighteen">
              Quelles sont les mesures qui pourraient vous inciter à utiliser
              davantage le vélo ?
            </label>
            <br />
            Des aménagements cyclables plus nombreux sur mon trajet{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="Des aménagements cyclables plus nombreux sur mon trajet"
            />
            <br />
            Une information sur les pistes cyclables{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="Une information sur les pistes cyclables"
            />
            <br />
            Une aide financière pour acheter un vélo{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="Une aide financière pour acheter un vélo"
            />
            <br />
            Une indemnité kilométrique vélo{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="Une indemnité kilométrique vélo"
            />
            <br />
            La présence d’une station de vélo en libre-service à proximité du
            site ou de mon domicile{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="La présence d’une station de vélo en libre-service à proximité du site ou de mon domicile"
            />
            <br />
            Un stationnement vélo sécurisé et abrité
            <input
              type="checkbox"
              id="questionEighteen"
              name="Un stationnement vélo sécurisé et abrité"
            />
            <br />
            Des douches et des vestiaires{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="Des douches et des vestiaires"
            />
            <br />
            L’offre d’équipement adapté (cadenas, vêtement de pluie, lumière,
            casque){" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="L’offre d’équipement adapté (cadenas, vêtement de pluie, lumière, casque)"
            />
            <br />
            Un retour assuré en cas de mauvais temps{" "}
            <input
              type="checkbox"
              id="questionEighteen"
              name="Un retour assuré en cas de mauvais temps"
            />
            <br />
            Autre
            <input type="checkbox" id="questionEighteen" name="Autre" />
            <br />
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Sondage;
