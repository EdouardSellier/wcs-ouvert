import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./css/Resultat.css";

const ResultBar = props => {
  return (
    <React.Fragment>
      <Row className="">
        <Col md={{ size: 10 }} className="">
          <Col xs={{ size: 12 }} className="">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }} className="">
            <Col xs={{ size: 1 }} className="">
              <Col xs={{ size: 12 }} className="">
                100%
              </Col>
              <Col xs={{ size: 12 }} className="">
                50%
              </Col>
              <Col xs={{ size: 12 }} className="">
                0%
              </Col>
            </Col>
            <Col xs={{ size: 11 }} className="">
              {props.possibilities.map(data => (
                <Col xs={{ size: 1 }} className="">
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
                    className=""
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
          <Col xs={{ size: 12 }} className="">
            <Col xs={{ size: 11 }} className="">
              {props.possibilities.map(data => (
                <Col xs={{ size: 1 }} className="">
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
