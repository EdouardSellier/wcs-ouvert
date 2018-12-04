import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/Sondage.css";

const Option = props => {
  return (
    <React.Fragment>
      <label for={props.data.id}>{props.data.label}</label>
      <br />
      <select id={props.data.id} onChange={props.function}>
        {props.data.possibilities.map(content => {
          return <option>{content}</option>;
        })}
      </select>
      <p />
    </React.Fragment>
  );
};

const Checkbox = props => {
  return (
    <React.Fragment>
      <label for={props.data.id}>{props.data.label}</label>
      <br />
      {props.data.possibilities.map(content => {
        return (
          <input
            type="checkbox"
            id={props.data.id}
            name={content}
            onChange={props.function}
          />
        );
      })}
      <p />
    </React.Fragment>
  );
};

class Sondage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: "questionOne",
          type: "option",
          label:
            "De manière générale, pour vos déplacements domicile-travail, utilisez-vous : ",
          possibilities: [
            "un seul mode de transport",
            "plusieurs modes de transport successivement dans un même trajet"
          ]
        },
        {
          id: "questionTwo",
          type: "option",
          label:
            "Quel est votre mode de transport habituel votre trajet domicile-travail ?",
          possibilities: [
            "Voiture personnelle",
            "Voiture de fonction/service",
            "Covoiturage",
            "Train (RER,…)",
            "Métro",
            "Bus",
            "Tramway",
            "Deux roues non motorisées dit transport doux (vélo, trottinette, roller...)",
            "Deux roues motorisées (moto, scooter)",
            "Marche à pied (ou course)",
            "Autre"
          ]
        },
        {
          id: "questionThree",
          type: "checkbox",
          label: "Dans quel ordre les utilisez-vous ?",
          possibilities: [
            "Voiture personnelle",
            "Voiture de fonction/service",
            "Covoiturage",
            "Train (RER,…)",
            "Métro",
            "Bus",
            "Tramway",
            "Deux roues non motorisées dit transport doux (vélo, trottinette, roller...)",
            "Deux roues motorisées (moto, scooter)",
            "Marche à pied (ou course)",
            "Autre"
          ]
        }
      ]
    };
  }

  change(e) {
    alert(e.target.value);
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
            {this.state.questions.map(data => {
              switch (data.type) {
                case "option":
                  return <Option data={data} />;

                case "checkbox":
                  return <Checkbox data={data} />;
                default:
                  return <p>Il y a une erreur.</p>;
              }

              //return <p>{data.type}</p>;
            })}
            {/*<Option
              data={this.state.questions[0]}
              function={e => this.change(e)}
            />
            <Option
              data={this.state.questions[1]}
              function={e => this.change(e)}
            />
            <Checkbox
              data={this.state.questions[2]}
              function={e => this.change(e)}
            />*/}
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Sondage;
