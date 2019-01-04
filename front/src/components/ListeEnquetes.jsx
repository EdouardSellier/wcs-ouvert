import React, { Component } from "react";
import "./css/ListeEnquetes.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import JsonTable from "ts-react-json-table";
import NotificationAlert from "react-notification-alert";

const errorMsg = {
  place: "tr",
  message: "La liste ne peut pas être affichée.",
  type: "danger",
  autoDismiss: 4
};

class ListeEnquetes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyList: [],
      currentPage: 1,
      nbPages: 1,
      changePage: false,
      isSelected: 5
    };
  }

  alertFunctionError = () => {
    this.refs.notificationAlertError.notificationAlert(errorMsg);
  };

  backToHome = event => {
    event.preventDefault();
    this.props.history.push("/admin");
  };

  handleChange = e => {
    this.setState(
      {
        isSelected: e.target.value
      },
      () => {
        this.getList();
      }
    );
  };

  getList = () => {
    axios
      .get("http://localhost:8080/admin/list/survey")
      .then(result => {
        let arrayShown = result.data;
        let nbPages = Math.ceil(arrayShown.length / this.state.isSelected);
        arrayShown = arrayShown.slice(
          this.state.currentPage * this.state.isSelected,
          this.state.currentPage * this.state.isSelected + this.state.isSelected
        );
        /*switch (this.state.currentPage) {
          case 1:
            arrayShown = arrayShown.slice(
              this.state.currentPage * this.state.isSelected,
              this.state.currentPage * this.state.isSelected +
                this.state.isSelected
            );
            break;
          case 2:
            arrayShown = arrayShown.slice(
              this.state.isSelected,
              this.state.isSelected * 2
            );
            break;
          case 3:
            arrayShown = arrayShown.slice(
              this.state.isSelected + this.state.isSelected,
              this.state.isSelected + this.state.isSelected * 2
            );
            break;
          case 4:
            arrayShown = arrayShown.slice(
              this.state.isSelected + this.state.isSelected,
              this.state.isSelected + this.state.isSelected * 2
            );
            break;
          case 5:
            arrayShown = arrayShown.slice(
              this.state.isSelected + this.state.isSelected,
              this.state.isSelected + this.state.isSelected * 2
            );
            break;
          default:
            arrayShown = arrayShown.slice(0, this.state.isSelected);
        }*/

        this.setState({
          surveyList: arrayShown,
          nbPages: nbPages
        });
      })
      .catch(err => {
        this.alertFunctionError();
      });
  };

  changePageUp = () => {
    if (
      this.state.currentPage >= 1 &&
      this.state.currentPage < this.state.nbPages
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
      this.getList();
    }
  };

  isDisabledUpButton = () => {
    return this.state.currentPage !== 1;
  };

  changePageDown = () => {
    if (
      this.state.currentPage >= 2 &&
      this.state.currentPage <= this.state.nbPages
    ) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
      this.getList();
    }
  };

  isDisabledDownButton = () => {
    return this.state.currentPage !== this.state.nbPages;
  };

  componentDidMount = () => {
    this.getList();
  };

  getSocietyListPage = () => {
    this.props.history.push("/listeentreprises");
  };

  render() {
    let columns = [
      { key: "user_id", label: "Société" },
      { key: "survey_name", label: "Nom de l'enquête" },
      {
        key: "starting_date",
        label: "Début de l'enquête",
        cell: columnKey => {
          let pattern = /[A-Z][0-9].:..:..\.[0-9]{3}[A-Z]/;
          let date = columnKey.starting_date.replace(pattern, "");
          let year = date[0] + date[1] + date[2] + date[3];
          let month = date[5] + date[6];
          let day = date[8] + date[9];
          return <p>{day + "/" + month + "/" + year}</p>;
        }
      },
      {
        key: "ending_date",
        label: "Fin de l'enquête",
        cell: columnKey => {
          let pattern = /[A-Z][0-9].:..:..\.[0-9]{3}[A-Z]/;
          let date = columnKey.ending_date.replace(pattern, "");
          let year = date[0] + date[1] + date[2] + date[3];
          let month = date[5] + date[6];
          let day = date[8] + date[9];
          return <p>{day + "/" + month + "/" + year}</p>;
        }
      }
    ];
    return (
      <div className="surveyList">
        <hr />
        <NotificationAlert ref="notificationAlertError" />
        <Container>
          <Row>
            <Col lg={{ size: 2 }}>
              <button className="btn text-white" onClick={this.backToHome}>
                <i className="fa fa-home" /> Revenir à l'accueil
              </button>
            </Col>
            <Col lg={{ size: 8 }}>
              <h2>Liste des enquêtes</h2>
            </Col>
            <Col lg={{ size: 2 }}>
              <button className="btn btn-danger" onClick={this.handleSubmit}>
                <i className="fa fa-power-off" /> Déconnexion
              </button>
            </Col>
          </Row>
          <Row className="mt-5 mb-2">
            <Col lg={{ size: 2, offset: 10 }}>
              <label className="mt-3 mr-3">Afficher :</label>
              <select
                onChange={this.handleChange}
                value={this.state.isSelected}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 12 }}>
              <JsonTable
                rows={this.state.surveyList}
                columns={columns}
                className="table table-striped"
              />
              <div className="row justify-content-around pb-3 mb-5 mt-3">
                <button
                  className="btn arrowLeft"
                  onClick={this.changePageDown}
                  disabled={!this.isDisabledUpButton()}
                >
                  <i className="fa fa-chevron-left" />
                </button>
                <span>
                  Page {this.state.currentPage} / {this.state.nbPages}
                </span>
                <button
                  className="btn arrowRight"
                  onClick={this.changePageUp}
                  disabled={!this.isDisabledDownButton()}
                >
                  <i className="fa fa-chevron-right" />
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        <Col lg={{ size: 3 }}>
          <button
            className="btn getSocietyPage mb-3"
            onClick={this.getSocietyListPage}
          >
            <i className="fa fa-arrow-left" /> <i className="fa fa-users" />{" "}
            Consulter les entreprises
          </button>
        </Col>
      </div>
    );
  }
}
export default ListeEnquetes;
