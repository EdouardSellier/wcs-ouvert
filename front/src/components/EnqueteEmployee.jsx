import React, { Component } from "react";
import questions from "./questions";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import "./css/EnqueteEmployee.css";
import { urlBackEnd } from "../conf";

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

const errorOnSubmit = {
  place: "tr",
  message:
    "Nous avons rencontré un problème lors de l'enregistrement de vos réponses, nous vous remercions de patienter quelques instants.",
  type: "danger",
  autoDismiss: 4
};

const successOnSubmit = {
  place: "tr",
  message:
    "Nous avons remercions d'avoir répondu à l'enquête, vos réponses ont bien été enregistrées.",
  type: "success",
  autoDismiss: 4
};

const errorAlreadyAnswered = {
  place: "tr",
  message:
    "Vous avez déjà répondu à l'enquête, vous ne pouvez pas y répondre une seconde fois.",
  type: "danger",
  autoDismiss: 4
};

class EnqueteEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statesForm: {
        token_employee: null,
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
      },
      hideButton: false
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorOnSubmit);
  };

  alertFunctionSuccess = () => {
    this.refs.notificationAlertSuccess.notificationAlert(successOnSubmit);
  };

  alertFunctionErrorAlreadyAnswered = () => {
    this.refs.notificationAlertErrorAlreadyAnswered.notificationAlert(
      errorAlreadyAnswered
    );
  };

  changeFormState = (event, index, col) => {
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

  handleSubmit = event => {
    event.preventDefault();
    let statesForm = this.state.statesForm;
    axios({
      method: "post",
      url: `${urlBackEnd}/employee/send/sondage`,
      data: statesForm
    })
      .then(res => {
        this.alertFunctionSuccess();
        this.setState({
          hideButton: true
        });
      })
      .catch(error => {
        this.alertFunctionError();
        this.setState({
          hideButton: true
        });
      });
  };

  componentDidMount() {
    axios({
      method: "get",
      url: `${urlBackEnd}/employee/list/` + this.props.match.params.token
    })
      .then(res => {
        if (res.data[0].date_response !== null) {
          this.alertFunctionErrorAlreadyAnswered();
          this.setState({
            hideButton: true
          });
        } else {
          let statesForm = this.state.statesForm;
          statesForm.token_employee = this.props.match.params.token;
        }
      })
      .catch(error => {
        this.alertFunctionError();
        this.setState({
          hideButton: true
        });
      });
  }

  render() {
    return (
      <div>
        <div className="text-white p-3">
          <h1>
            <b>Enquête de mobilité</b>
          </h1>
          <NotificationAlert ref="notificationAlertError" />
          <NotificationAlert ref="notificationAlertSuccess" />
          <NotificationAlert ref="notificationAlertErrorAlreadyAnswered" />
          <div className="d-flex justify-content-center mt-5">
            <div className="textAlignLeft col-8">
              <form
                className="card shadow p-5 mb-3"
                onSubmit={event => this.handleSubmit(event)}
              >
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
                {this.state.hideButton === false ? (
                  <button className="btn text-white">Envoyer</button>
                ) : (
                  <div className="hasAnswered">Merci d'avoir répondu !</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EnqueteEmployee;
