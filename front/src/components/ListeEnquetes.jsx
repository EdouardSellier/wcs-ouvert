import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import JsonTable from "ts-react-json-table";
import axios from "axios";
import "./css/EspaceAdmin.css";

const errorMsg = {
  place: "tr",
  message: "La liste ne peut pas être affichée pour l'instant.",
  type: "danger",
  autoDismiss: 4
};

class ListeEnquetes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyList: [],
      currentPage: 1,
      nbPages: 0,
      nextPage: 0,
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
    let startPage = 0 + this.state.nextPage;
    let body = {
      start: startPage,
      limit: this.state.isSelected
    };
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: "http://localhost:8080/admin/list/survey",
      data: body,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        let arrayShown = res.data.data;
        let nbPages = Math.ceil(res.data.totalCount / this.state.isSelected);
        this.setState({
          surveyList: arrayShown,
          nbPages: nbPages
        });
      })
      .catch(error => {
        this.alertFunctionError();
      });
  };

  componentDidMount = () => {
    this.getList();
  };

  handleChangePage = currentPage => {
    this.getList(currentPage);
    this.setState({
      currentPage
    });
  };

  changePageUp = () => {
    let newPage =
      parseInt(this.state.nextPage) + parseInt(this.state.isSelected);
    this.setState(
      {
        currentPage: this.state.currentPage + 1,
        nextPage: newPage
      },
      () => {
        this.getList();
      }
    );
  };

  isDisabledUpButton = () => {
    return this.state.currentPage > 1;
  };

  changePageDown = () => {
    let newPage =
      parseInt(this.state.nextPage) - parseInt(this.state.isSelected);
    if (this.state.currentPage > 1) {
      this.setState(
        {
          currentPage: this.state.currentPage - 1,
          nextPage: newPage
        },
        () => {
          this.getList();
        }
      );
    }
  };

  isDisabledDownButton = () => {
    return this.state.currentPage < this.state.nbPages;
  };

  getSocietyListPage = () => {
    this.props.history.push("/listeentreprises");
  };

  getGeolocationListPage = () => {
    this.props.history.push("/listegeoloc");
  };

  render() {
    let columns = [
      { key: "company_name", label: "Société" },
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
      <div className="surveyList text-white mt-3">
        <NotificationAlert ref="notificationAlertError" />
        <Container>
          <Row>
            <Col lg={{ size: 2 }}>
              <button className="btn text-white" onClick={this.backToHome}>
                <i className="fa fa-home" /> Revenir à l'accueil
              </button>
            </Col>
            <Col lg={{ size: 8 }}>
              <h1>
                <b>Liste des enquêtes</b>
              </h1>
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
          <Row className="card shadow">
            <Col lg={{ size: 12 }}>
              <JsonTable
                rows={this.state.surveyList}
                columns={columns}
                className="table table-striped"
              />
              <div className="row justify-content-around pb-3 mt-3">
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
        <Container className="mt-5">
          <Row>
            <Col lg={{ size: 3 }}>
              <button
                className="btn getPage mt-3 mb-3 text-white"
                onClick={this.getSocietyListPage}
              >
                <i className="fa fa-arrow-left" /> <i className="fa fa-users" />{" "}
                <b>Consulter les entreprises</b>
              </button>
            </Col>
            <Col lg={{ size: 3, offset: 6 }}>
              <button
                className="btn getPage mt-3 mb-3 text-white"
                onClick={this.getGeolocationListPage}
              >
                <b>Consulter les géolocalisations</b>{" "}
                <i className="fa fa-map" /> <i className="fa fa-arrow-right" />
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default ListeEnquetes;
