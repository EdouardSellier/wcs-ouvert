import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/Resultat.css";

const ResultBar = props => {
  return (
    <React.Fragment>
      <Row className="d-flex justify-content-center">
        <Col md={{ size: 10 }} className="mb-5 pb-5  d-none d-lg-block">
          <Col xs={{ size: 12 }} className="my-5 componentTitle">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }} className="d-flex containerResultBar px-0">
            <Col xs={{ size: 1 }} className="px-0">
              <Col xs={{ size: 12 }} className="colHundred pl-1">
                100%
              </Col>
              <Col xs={{ size: 12 }} className="colFifty pl-1">
                50%
              </Col>
              <Col xs={{ size: 12 }} className="colZero  pl-1">
                0%
              </Col>
            </Col>
            <Col xs={{ size: 11 }} className="d-flex justify-content-center">
              {props.possibilities.map(data => (
                <Col xs={{ size: 1 }} className="containerBar">
                  <Col
                    xs={{ size: 12 }}
                    style={{
                      height:
                        100 /
                          (props.dataFetch.length /
                            props.dataFetch.filter(
                              dataFetch => dataFetch[props.index] === data
                            ).length) +
                        "%",
                      display: "flex",
                      alignItems: "flex-end"
                    }}
                    className="px-0"
                  >
                    <StyledSquare pose={props.hovering ? "end" : "start"}>
                      {(
                        100 /
                        (props.dataFetch.length /
                          props.dataFetch.filter(
                            dataFetch => dataFetch[props.index] === data
                          ).length)
                      ).toFixed(2) + "%"}
                    </StyledSquare>
                  </Col>
                </Col>
              ))}
            </Col>
          </Col>
          <Col xs={{ size: 12 }} className="px-0 justifyContentRight">
            <Col xs={{ size: 11 }} className="d-flex justify-content-center">
              {props.possibilities.map(data => (
                <Col xs={{ size: 1 }} className="barTitle">
                  {data}
                </Col>
              ))}
            </Col>
          </Col>
        </Col>
      </Row>
    </React.Fragment>
  );
};

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
              return <ResultBar />;
            case "multipleOption":
              return <ResultPie />;
            case "number":
              return <ResultText />;
            default:
              return false;
          }
        })}
      </div>
    );
  }
}

export default Resultat;
