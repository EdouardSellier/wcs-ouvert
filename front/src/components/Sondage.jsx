import React, { Component } from "react";
import Footer from "./Footer";
import questions from "./questions";
import axios from "axios";
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
                props.changeFormState(event, props.data.index, "one")
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
                props.changeFormState(event, props.data.index, "two")
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
                props.changeFormState(event, props.data.index, "three")
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
        token_employee: this.props.match.params.token,
        genre: "Un homme",
        age: "25 ans ou moins",
        principal_transport_one: "Voiture personnelle",
        principal_transport_two: "------",
        principal_transport_three: "------",
        ocasionaly_transport_one: "Voiture personnelle",
        ocasionaly_transport_two: "------",
        ocasionaly_transport_three: "------",
        reason_transport: "Rapidité",
        distance_klm: 0,
        distance_min: 0,
        distance_money: 0,
        elements_one: "Pas d’obligation particulière",
        elements_two: "------",
        elements_three: "------",
        parking_place: "Oui",
        midday: "Sur mon lieu de travail dans le restaurant d’entreprise",
        frequency_midday: "Jamais",
        transport_midday: "Voiture personnelle",
        frequency_pro: "Je ne fais jamais de déplacements professionnels",
        distance_pro: "Je ne fais jamais de déplacements professionnels",
        deplacement_pro: "Voiture personnelle",
        reason_perso_car: "Pas d’autres solutions identifiées",
        deplacement_method_pro:
          "J’utilise quotidiennement un mode de déplacements alternatif à la voiture individuelle",
        commun_transport_one: "J’utilise déjà souvent les transports en commun",
        commun_transport_two: "------",
        commun_transport_three: "------",
        bike_one: "Je me déplace déjà souvent à vélo",
        bike_two: "------",
        bike_three: "------",
        carpooling_one: "Je covoiture déjà souvent",
        carpooling_two: "------",
        carpooling_three: "------",
        other_than_car: "",
        commentary: ""
      }
    };
  }

  changeFormState = (event, index, col) => {
    alert(index);
    let statesForm = this.state.statesForm;

    if (col === undefined) {
      statesForm[index] = event.target.value;
    } else {
      statesForm[index + col] = event.target.value;
    }

    this.setState({
      statesForm: statesForm
    });
  };

  submit = event => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: "http://localhost:8080/employee/send/sondage",
      data: this.state.statesForm,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        alert("ca marche");
      })
      .catch(error => {
        alert("pas");
        this.alertFunctionError();
      });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url:
        "http://localhost:8080/employee/list/" + this.props.match.params.token,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.data.date_response != null) {
          this.props.history.push("/");
        }
        this.setState({
          token_employee: this.props.match.params.token
        });
      })
      .catch(error => {
        alert(error);
      });
  }

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
              <form className="" onSubmit={event => this.submit(event)}>
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
