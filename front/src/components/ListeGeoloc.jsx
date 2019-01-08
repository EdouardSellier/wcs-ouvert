import React, { Component } from "react";
import "./css/EspaceAdmin.css";
import { Container, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import JsonTable from "ts-react-json-table";
import axios from "axios";
import { CSVLink } from "react-csv";

const errorMsg = {
  place: "tr",
  message: "La liste ne peut pas être affichée pour l'instant.",
  type: "danger",
  autoDismiss: 4
};

class ListeGeoloc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geolocationList: [],
      currentPage: 1,
      nbPages: 0,
      nextPage: 0,
      isSelected: 5,
      csvData: [],
      cellContent: []
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
    axios({
      method: "post",
      url: "http://localhost:8080/admin/list/geolocation",
      data: body
    })
      .then(res => {
        let arrayShown = res.data.data;
        let nbPages = Math.ceil(res.data.totalCount / this.state.isSelected);
        this.setState({
          geolocationList: arrayShown,
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

  onClickCell = (e, column, item) => {
    if (column === "id") {
      let societyData = item.society_position;
      let employeeData = item.employees_positions;
      let regex = /\(/gi;
      let society = societyData.replace(regex, ";(");
      let employees = employeeData.replace(regex, ";(");
      let allData = `${society},${employees}`;
      let csvData = this.state.csvData;
      allData.split(",").map(data => {
        let newData = data.split(";");
        return csvData.push(newData);
      });
      this.setState({
        csvData: csvData
      });
    }
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

  getSurveyListPage = () => {
    this.props.history.push("/listeenquetes");
  };

  render() {
    let columns = [
      { key: "society_position", label: "Adresse et position de la société" },
      {
        key: "employees_positions",
        label: "Adresses et positions des salariés",
        cell: columnKey => {
          return (
            <ul className="list-unstyled employeesList">
              {columnKey.employees_positions.split(",").map((data, id) => {
                return (
                  <li key={id}>
                    {id + 1}) {data}
                  </li>
                );
              })}
            </ul>
          );
        }
      },
      {
        key: "id",
        label: "Exporter les données",
        cell: () => {
          return (
            <CSVLink
              data={this.state.csvData}
              className="btn btn-sm btn-warning"
            >
              <b>
                Export CSV <i className="fa fa-file-o" />
              </b>
            </CSVLink>
          );
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
                <b>Données de géolocalisation</b>
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
                rows={this.state.geolocationList}
                columns={columns}
                className="table table-striped text-left"
                onClickCell={this.onClickCell}
                filename={"geolocation.csv"}
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
        <Col lg={{ size: 3 }}>
          <button
            className="btn getPage mt-5 mb-3 text-white"
            onClick={this.getSurveyListPage}
          >
            <i className="fa fa-arrow-left" /> <i className="fa fa-users" />{" "}
            <b>Consulter les enquêtes</b>
          </button>
        </Col>
      </div>
    );
  }
}
export default ListeGeoloc;
