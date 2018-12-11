import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/Sondage.css";

const MultipleOption = props => {
  return (
    <React.Fragment>
      <br />
      <div className="mb-5">
        <label htmlFor={props.data.id} className="w-50">
          {props.data.label}
        </label>
        <div className="d-flex">
          <div className="threeInput">
            <span>1.</span>
            <select
              id={props.data.id}
              className="w-100"
              onChange={event =>
                props.changeFormState(event, props.data.index, 0)
              }
            >
              {props.data.possibilities.map(content => {
                return <option key={content}>{content}</option>;
              })}
            </select>
          </div>
          <div className="threeInput">
            <span>2.</span>
            <select
              id={props.data.id}
              className="w-100"
              onChange={event =>
                props.changeFormState(event, props.data.index, 1)
              }
            >
              <option>------</option>
              {props.data.possibilities.map(content => {
                return <option key={content}>{content}</option>;
              })}
            </select>
          </div>
          <div className="threeInput">
            <span>3.</span>
            <select
              id={props.data.id}
              className="w-100"
              onChange={event =>
                props.changeFormState(event, props.data.index, 2)
              }
            >
              <option>------</option>
              {props.data.possibilities.map(content => {
                return <option key={content}>{content}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Text = props => {
  return (
    <React.Fragment>
      <label htmlFor={props.data.id}>{props.data.label}</label>
      <br />
      <textarea
        onChange={event => props.changeFormState(event, props.data.index)}
        className="mb-5 commentary"
      />
      <p />
    </React.Fragment>
  );
};

const Option = props => {
  return (
    <React.Fragment>
      <label htmlFor={props.data.id}>{props.data.label}</label>
      <br />
      <select
        className="mb-5"
        id={props.data.id}
        onChange={event => props.changeFormState(event, props.data.index)}
      >
        {props.data.possibilities.map(content => {
          return <option key={content}>{content}</option>;
        })}
      </select>
      <p />
    </React.Fragment>
  );
};

const Number = props => {
  return (
    <React.Fragment>
      <label htmlFor={props.data.id}>{props.data.label}</label>
      <br />
      <input
        className="mb-5"
        type="number"
        id={props.data.id}
        onChange={event => props.changeFormState(event, props.data.index)}
      />
      <br />
    </React.Fragment>
  );
};

class Sondage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: "genre",
          type: "option",
          label: "Vous êtes :",
          possibilities: [
            "Un homme",
            "Une femme",
            "Je ne souhaite pas répondre"
          ],
          index: "genre"
        },
        {
          id: "age",
          type: "option",
          label: "Vous avez :",
          possibilities: [
            "25 ans ou moins",
            "Entre 26 et 40 ans",
            "Entre 41 et 55 ans",
            "56 ans ou plus",
            "Je ne souhaite pas répondre"
          ],
          index: "age"
        },
        {
          id: "principalTransport",
          type: "multipleOption",
          label:
            "Quel(s) mode(s) de déplacements utilisez-vous pour venir travailler ? Si vous utilisez plusieurs modes de déplacements au cours de votre trajet domicile-travail, veuillez les renseigner dans l’ordre d’importance qu’ils ont dans votre parcours (en termes de temps et de distance)",
          possibilities: [
            "Voiture personnelle",
            "Voiture de fonction/service",
            "Covoiturage",
            "Train",
            "Transports en commun (tramway, métro bus)",
            "Vélo",
            "Trottinette",
            "Gyropode",
            "Deux-roues motorisés",
            "Marche à pied"
          ],
          index: "principalTransport"
        },
        {
          id: "ocasionalyTransport",
          type: "multipleOption",
          label:
            "Peut-être utilisez-vous occasionnellement d’autres modes de déplacements en fonction du jour de la semaine, de vos horaires, de la météo…",
          possibilities: [
            "Voiture personnelle",
            "Voiture de fonction/service",
            "Covoiturage",
            "Train",
            "Transports en commun (tramway, métro bus)",
            "Vélo",
            "Trottinette",
            "Gyropode",
            "Deux-roues motorisés",
            "Marche à pied"
          ],
          index: "ocasionalyTransport"
        },
        {
          id: "reasonTransport",
          type: "option",
          label:
            "Quelle(s) raison(s) motive(nt) le choix de votre mode de déplacements principal ?",
          possibilities: [
            "Rapidité",
            "Pas d’autres choix",
            "Coût avantageux",
            "Pour ma santé, mon bien-être",
            "Moins stressant",
            "Plus écologique",
            "Adapté à mes horaires",
            "Sécurité",
            "Indépendance",
            "Autre raison"
          ],
          index: "reasonTransport"
        },

        {
          id: "distanceKlm",
          type: "number",
          label: "Quelle distance (en km) parcourez-vous pour :",
          possibilities: [],
          index: "distanceKlm"
        },
        {
          id: "distanceMin",
          type: "number",
          label: "Combien de temps (en minutes) mettez-vous pour :",
          possibilities: [],
          index: "distanceMin"
        },

        {
          id: "distanceMoney",
          type: "number",
          label: "Quel budget (en euros) dépensez-vous pour :",
          possibilities: [],
          index: "distanceMoney"
        },
        {
          id: "elements",
          type: "multipleOption",
          label:
            "Quels éléments prenez-vous en compte pour organiser vos déplacements domicile–travail ?",
          possibilities: [
            "Pas d’obligation particulière",
            "Accompagnement des enfants",
            "Horaires (début matinal, sortie tardive, imprévisibles…)",
            "Activités sur le temps de midi",
            "Déplacements professionnels fréquents",
            "Autre :"
          ],
          index: "elements"
        },
        {
          id: "parkingPlace",
          type: "option",
          label:
            "Si vous vous rendez en voiture sur votre lieu de travail, y-trouvez-vous facilement une place de parking ?",
          possibilities: [
            "Oui",
            "Non",
            "Je ne me rends pas sur mon lieu de travail en voiture"
          ],
          index: "parkingPlace"
        },
        {
          id: "midday",
          type: "option",
          label: "Où déjeunez–vous le plus souvent le midi ?",
          possibilities: [
            "Sur mon lieu de travail dans le restaurant d’entreprise",
            "Sur mon lieu de travail avec mon propre repas",
            "A mon domicile",
            "A l’extérieur"
          ],
          index: "midday"
        },
        {
          id: "frequencyMidday",
          type: "option",
          label:
            "En moyenne, à quelle fréquence effectuez–vous des déplacements le midi ?",
          possibilities: [
            "Jamais",
            "Moins d’une fois par semaine",
            "1 fois par semaine",
            "2 à 4 fois par semaine",
            "Tous les jours"
          ],
          index: "frequencyMidday"
        },
        {
          id: "transportMidday",
          type: "option",
          label:
            "Lorsque vous vous déplacez le midi, quel mode de transport utilisez-vous principalement ?",

          possibilities: [
            "Voiture personnelle",
            "Voiture de fonction/service",
            "Covoiturage",
            "Train",
            "Transports en commun (tramway, métro bus)",
            "Vélo",
            "Trottinette",
            "Gyropode",
            "Deux-roues motorisés",
            "Marche à pied"
          ],
          index: "transportMidday"
        },
        {
          id: "frequencyPro",
          type: "option",
          label:
            "A quelle fréquence effectuez–vous des déplacements professionnels ?",

          possibilities: [
            "Je ne fais jamais de déplacements professionnels",
            "Quelques fois par an",
            "1 à 2 fois par mois",
            "1 à 2 fois par semaine",
            "Plus de 2 fois par semaine"
          ],
          index: "frequencyPro"
        },
        {
          id: "distancePro",
          type: "option",
          label:
            "A quelle distance (aller ou retour, en km) vous déplacez–vous en moyenne pour les déplacements professionnels ?",

          possibilities: [
            "Je ne fais jamais de déplacements professionnels",
            "Moins de 10 km",
            "Entre 10 et 30 km",
            "Entre 30 et 50 km",
            "Plus de 50 km"
          ],
          index: "distancePro"
        },
        {
          id: "deplacementPro",
          type: "option",
          label:
            "Pour vos déplacements professionnels, quel mode de déplacements utilisez-vous principalement ?",
          possibilities: [
            "Voiture personnelle",
            "Voiture de fonction/service",
            "Covoiturage",
            "Train",
            "Transports en commun (tramway, métro bus)",
            "Vélo",
            "Trottinette",
            "Gyropode",
            "Deux-roues motorisés",
            "Marche à pied"
          ],
          index: "deplacementPro"
        },
        {
          id: "reasonPersoCar",
          type: "option",
          label:
            "Si vous utilisez votre voiture personnelle pour des déplacements professionnels, pour quelle raison ?",
          possibilities: [
            "Pas d’autres solutions identifiées",
            "Confort",
            "Rapidité",
            "Flexibilité (si déplacement tôt ou tard)",
            "Aucune raison particulière",
            "Je n’utilise pas ma voiture personnelle pour les déplacements professionnels"
          ],
          index: "reasonPersoCar"
        },
        {
          id: "deplacementMethodPro",
          type: "option",
          label:
            "Parmi les affirmations ci-dessous, laquelle correspond le plus à la manière dont vous vous déplacez pour vous rendre sur votre lieu de travail ?",
          possibilities: [
            "J’utilise quotidiennement un mode de déplacements alternatif à la voiture individuelle",
            "Je connais des alternatives à la voiture individuelle, j’essaye de les utiliser lorsque c’est possible et j’envisage de les utiliser davantage",
            "Je connais des alternatives à la voiture individuelle mais je ne les ai pas encore mises en pratique",
            "Je ne connais pas suffisamment les différentes possibilités de me rendre au travail sans voiture",
            "Mes contraintes (logement, obligations familiales…) ne me permettent pas d’utiliser un autre mode de déplacement que la voiture",
            "Je n’ai pas envie de changer mes habitudes de déplacements"
          ],
          index: "deplacementMethodPro"
        },
        {
          id: "communTransport",
          type: "multipleOption",
          label:
            "Parmi ces propositions, lesquelles vous inciteraient à utiliser davantage les transports en commun ?",
          possibilities: [
            "J’utilise déjà souvent les transports en commun",
            "Une meilleure offre de transports en commun (accessibilité, temps de trajet, desserte, correspondances)",
            "Un meilleur sentiment de sécurité",
            "Un abonnement à une offre de transports en commun moins onéreuse",
            "Autre :"
          ],
          index: "communTransport"
        },
        {
          id: "bike",
          type: "multipleOption",
          label:
            "Parmi ces mesures, lesquelles vous inciteraient à utiliser davantage le vélo ?",
          possibilities: [
            "Je me déplace déjà souvent à vélo",
            "Un meilleur sentiment de sécurité",
            "Des aménagements cyclables plus nombreux sur mon trajet",
            "Des aménagements cyclables de meilleure qualité sur mon trajet",
            "La mise à disposition d’informations sur les pistes cyclables",
            "La mise en place de l’indemnité kilométrique vélo",
            "Un stationnement vélo sécurisé et abrité",
            "Des douches et des vestiaires",
            "Autre :",
            "Rien, je ne souhaite pas pédaler"
          ],
          index: "bike"
        },
        {
          id: "carpooling",
          type: "multipleOption",
          label:
            "Parmi ces mesures, lesquelles vous inciteraient davantage à covoiturer ?",
          possibilities: [
            "Je covoiture déjà souvent",
            "Une place de parking dédiée aux covoitureurs à proximité de l’entrée",
            "Une mise en relation avec les collègues habitant à proximité de chez moi",
            "Un retour assuré en cas de désistement du covoitureur ou circonstances imprévues",
            "Autre :",
            "Rien, je ne souhaite pas covoiturer "
          ],
          index: "carpooling"
        },
        {
          id: "otherThanCar",
          type: "text",
          label:
            "Avez–vous une ou des idée(s) de modes de déplacements alternatifs à la voiture individuelle qui conviendrai(en)t à votre situation ?",
          possibilities: [],
          index: "otherThanCar"
        },
        {
          id: "commentary",
          type: "text",
          label:
            "Si vous avez des commentaires ou remarques éventuelles, n’hésitez pas à nous en faire part !",
          possibilities: [],
          index: "commentary"
        }
      ],
      statesForm: {
        genre: "Un homme",
        age: "25 ans ou moins",
        principalTransport: ["Voiture personnelle", "------", "------"],
        ocasionalyTransport: ["Voiture personnelle", "------", "------"],
        reasonTransport: "Rapidité",
        distanceKlm: null,
        distanceMin: null,
        distanceMoney: null,
        elements: ["Pas d’obligation particulière", "------", "------"],
        parkingPlace: "Oui",
        midday: "Sur mon lieu de travail dans le restaurant d’entreprise",
        frequencyMidday: "Jamais",
        transportMidday: "Voiture personnelle",
        frequencyPro: "Je ne fais jamais de déplacements professionnels"
      }
    };
  }

  changeFormState = (event, index, col) => {
    let statesForm = this.state.statesForm;
    switch (index) {
      case "genre":
        statesForm.genre = event.target.value;
        break;
      case "age":
        statesForm.age = event.target.value;
        break;
      case "principalTransport":
        statesForm.principalTransport[col] = event.target.value;
        break;
      case "ocasionalyTransport":
        statesForm.ocasionalyTransport[col] = event.target.value;
        break;
      case "reasonTransport":
        statesForm.reasonTransport = event.target.value;
        break;
      case "distanceKlm":
        statesForm.distanceKlm = event.target.value;
        break;
      case "distanceMin":
        statesForm.distanceMin = event.target.value;
        break;
      case "distanceMoney":
        statesForm.distanceMoney = event.target.value;
        break;
      case "elements":
        statesForm.elements = event.target.value;
        break;
      case "parkingPlace":
        statesForm.parkingPlace = event.target.value;
        break;
      case "midday":
        statesForm.midday = event.target.value;
        break;
      case "frequencyMidday":
        statesForm.frequencyMidday = event.target.value;
        break;
      case "transportMidday":
        statesForm.transportMidday = event.target.value;
        break;
      case "frequencyPro":
        statesForm.frequencyPro = event.target.value;
        break;
      default:
        return false;
    }

    console.log(statesForm);
    this.setState({
      statesForm: statesForm
    });
  };

  render() {
    return (
      <div>
        <p className="homeSlogan">
          MOUV'R : Enquête de mobilité pour vos salariés
        </p>
        <HeaderRH />
        <div className="sondage mt-2">
          <h3>Sondage</h3>
          <div className="textAlignLeft pl-5">
            <form className="mt-5">
              {this.state.questions.map(data => {
                switch (data.type) {
                  case "option":
                    return (
                      <Option
                        key={data.id}
                        data={data}
                        changeFormState={this.changeFormState}
                      />
                    );
                  case "number":
                    return (
                      <Number
                        key={data.id}
                        data={data}
                        changeFormState={this.changeFormState}
                      />
                    );
                  case "multipleOption":
                    return (
                      <MultipleOption
                        key={data.id}
                        data={data}
                        changeFormState={this.changeFormState}
                      />
                    );
                  case "text":
                    return (
                      <Text
                        key={data.id}
                        data={data}
                        changeFormState={this.changeFormState}
                      />
                    );
                  default:
                    return <p>Il y a une erreur.</p>;
                }
              })}
              <button className="btn btn-primary btn-lg mb-5">Envoyer</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Sondage;
