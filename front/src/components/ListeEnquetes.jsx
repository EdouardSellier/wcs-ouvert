import React, { Component } from "react";
import "./css/ListeEnquetes.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import JsonTable from "ts-react-json-table";

class ListeEnquetes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyList: [],
      currentPage: 1,
      nbPages: 1,
      changePage: false
    };
  }

  backToHome = event => {
    event.preventDefault();
    this.props.history.push("/admin");
  };

  getList = () => {
    axios
      .get("http://localhost:8080/admin/list/survey")
      .then(result => {
        let arrayShown = result.data;
        let nbPages = Math.ceil(arrayShown.length / 5);
        switch (this.state.currentPage) {
          case 1:
            arrayShown = arrayShown.slice(0, 5);
            break;
          case 2:
            arrayShown = arrayShown.slice(5, 10);
            break;
          case 3:
            arrayShown = arrayShown.slice(10, 15);
            break;
          case 4:
            arrayShown = arrayShown.slice(15, 20);
            break;
          case 5:
            arrayShown = arrayShown.slice(20);
            break;
          default:
            arrayShown = arrayShown.slice(0, 5);
        }
        this.setState({
          surveyList: arrayShown,
          nbPages: nbPages
        });
      })
      .catch(err => {
        console.log(err);
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

  changePageDown = () => {
    if (this.state.currentPage >= 2 && this.state.currentPage <= 5) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
      this.getList();
    }
  };

  componentDidMount = () => {
    this.getList();
  };

  render() {
    let columns = [
      { key: "user_id", label: "Société" },
      { key: "survey_name", label: "Nom de l'enquête" },
      { key: "survey_address", label: "Adresse postale" },
      {
        key: "starting_date",
        label: "Début de l'enquête",
        cell: columnKey => {
          let pattern = /[A-Z][0-9].:..:..\.[0-9]{3}[A-Z]/;
          let date = columnKey.starting_date.replace(pattern, "");
          return <p>{date}</p>;
        }
      },
      {
        key: "ending_date",
        label: "Fin de l'enquête",
        cell: columnKey => {
          let pattern = /[A-Z][0-9].:..:..\.[0-9]{3}[A-Z]/;
          let date = columnKey.ending_date.replace(pattern, "");
          return <p>{date}</p>;
        }
      }
    ];
    return (
      <div className="surveyList">
        <hr />
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
          <Row className="m-4">
            <Col lg={{ size: 12 }}>
              <JsonTable
                rows={this.state.surveyList}
                columns={columns}
                className="table table-striped mt-5"
              />
              <div className="row justify-content-around pb-3 mb-5 mt-3">
                <button
                  className="btn text-white"
                  onClick={this.changePageDown}
                >
                  <i className="fa fa-chevron-left" />
                </button>
                <span>
                  Page {this.state.currentPage} / {this.state.nbPages}
                </span>
                <button className="btn text-white" onClick={this.changePageUp}>
                  <i className="fa fa-chevron-right" />
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default ListeEnquetes;
