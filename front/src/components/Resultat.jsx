import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/Resultat.css";

class Resultat extends Component {
  render() {
    return (
      <div className="container-fluid mt-2">
        <Row>
          <Col lg={{ size: 2 }}>
            <button className="mt-2 btn text-white" onClick={this.handleSubmit}>
              Revenir à l'accueil
            </button>
          </Col>
          <Col lg={{ size: 8 }}>
            <h3>Consulter les résultats de mon enquête</h3>
          </Col>
        </Row>
        <Row>
          <Col lg={{ size: 12 }}>
            <b>{this.state.dataFetch.length}</b> salariés ont pour l'instant
            répondu à ce sondage.
          </Col>
        </Row>
        {questions.map(data => {
          switch (data.type) {
            case "option":
              return (
                <ResultBar
                  hovering={this.state.hovering}
                  possibilities={data.possibilities}
                  index={data.index}
                  dataFetch={this.state.dataFetch}
                  label={data.label}
                />
              );
            case "multipleOption":
              return (
                <ResultPie
                  possibilities={data.possibilities}
                  index={data.index}
                  dataFetch={this.state.dataFetch}
                  label={data.label}
                />
              );
          }
        })}
      </div>
    );
  }
}

export default Resultat;
