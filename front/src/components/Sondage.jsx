import React, { Component } from "react";
import HeaderRH from "./HeaderRH";
import Footer from "./Footer";
import "./css/Sondage.css";

class Sondage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: ["un seul mode de transport", ""],
      questionTwo: []
    };
  }

  questionsUpdate(e, index) {
    let questions = this.state.questions;
    let questionTwo = this.state.questionTwo;
    questions[index] = e.target.value;
    if (
      this.state.questions[0] !== "un seul mode de transport" &&
      index === 1
    ) {
      if (questionTwo.includes(e.target.name)) {
        questionTwo = questionTwo.filter(res => res !== e.target.name);
      } else {
        questionTwo.push(e.target.name);
      }
      questions[index] = questionTwo;
    }
    alert(questions);
    this.setState({
      questions: questions,
      questionTwo: questionTwo
    });
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
            <select onChange={e => this.questionsUpdate(e, 0)} id="questionOne">
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
                <select
                  onChange={e => this.questionsUpdate(e, 1)}
                  id="questionTwo"
                >
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
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                Voiture de fonction/service :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Voiture de fonction/service"
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                Covoiturage :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Covoiturage"
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                Train (RER,…) :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Train (RER,…)"
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                Métro :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Métro"
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                Bus :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Bus"
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                Tramway :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Tramway"
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                Deux roues non motorisées dit transport doux (vélo, trottinette,
                roller...) :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Deux roues non motorisées dit transport doux (vélo,
                    trottinette, roller...)"
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                Marche à pied (ou course) :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Marche à pied (ou course)"
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                Autre :{" "}
                <input
                  type="checkbox"
                  id="questionTwo"
                  name="Autre"
                  onChange={e => this.questionsUpdate(e, 1)}
                />
                <br />
                {this.state.questionTwo.map(res => (
                  <span className="text-success"> -> {res}</span>
                ))}
              </div>
            )}
            <br />
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Sondage;
