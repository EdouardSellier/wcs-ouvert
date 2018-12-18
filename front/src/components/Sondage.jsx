import React, { Component } from "react";
import Footer from "./Footer";
import questions from "./questions";
import "./css/Sondage.css";

const MultipleOption = props => {
  return (
    <React.Fragment>
      <br />
      <div className="marginMultipleOption">
        <label htmlFor={props.data.id}>{props.data.label}</label>
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
        className="commentary"
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
        className="marginOption"
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
        className="marginNumber"
        placeholder="0"
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
      statesForm: {
        genre: "Un homme",
        age: "25 ans ou moins",
        principalTransport: ["Voiture personnelle", "------", "------"],
        ocasionalyTransport: ["Voiture personnelle", "------", "------"],
        reasonTransport: "Rapidité",
        distanceKlm: 0,
        distanceMin: 0,
        distanceMoney: 0,
        elements: ["Pas d’obligation particulière", "------", "------"],
        parkingPlace: "Oui",
        midday: "Sur mon lieu de travail dans le restaurant d’entreprise",
        frequencyMidday: "Jamais",
        transportMidday: "Voiture personnelle",
        frequencyPro: "Je ne fais jamais de déplacements professionnels",
        distancePro: "Je ne fais jamais de déplacements professionnels",
        deplacementPro: "Voiture personnelle",
        reasonPersoCar: "Pas d’autres solutions identifiées",
        deplacementMethodPro:
          "J’utilise quotidiennement un mode de déplacements alternatif à la voiture individuelle",
        communTransport: [
          "J’utilise déjà souvent les transports en commun",
          "------",
          "------"
        ],
        bike: ["Je me déplace déjà souvent à vélo", "------", "------"],
        carpooling: ["Je covoiture déjà souvent", "------", "------"],
        otherThanCar: "",
        commentary: ""
      }
    };
  }

  changeFormState = (event, index, col) => {
    let statesForm = this.state.statesForm;

    if (col === undefined) {
      statesForm[index] = event.target.value;
    } else {
      statesForm[index][col] = event.target.value;
    }

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
        <div className="sondage">
          <h3>Sondage</h3>
          <div className="d-flex justify-content-center">
            <div className="textAlignLeft col-6 pl-5">
              <form className="">
                {questions.map(data => {
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
                <button className="btn btn-primary btn-lg buttonSubmit">
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Sondage;
