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
        <Col xs={{ size: 10 }} className="mb-5 pb-5 d-block d-lg-none">
          <Col xs={{ size: 12 }} className="my-5 componentTitle">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }} className="px-0">
            {props.possibilities.map(data => (
              <Col xs={{ size: 12 }} className="d-flex my-2 border-bottom">
                <Col xs={{ size: 8 }}>{data}</Col>
                <Col xs={{ size: 4 }}>
                  {(
                    100 /
                    (props.dataFetch.length /
                      props.dataFetch.filter(
                        dataFetch => dataFetch[props.index] === data
                      ).length)
                  ).toFixed(2) + "%"}
                </Col>
              </Col>
            ))}
          </Col>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const ResultPie = props => {
  let possibilities = [];
  props.possibilities.map(data => possibilities.push(data));
  possibilities.push("------");

  let tab = { pie1: [], pie2: [], pie3: [] };
  props.possibilities.map(data =>
    tab.pie1.push(
      props.dataFetch.filter(state => state[props.index + "one"] === data)
        .length
    )
  );

  return (
    <React.Fragment>
      <Row className="">
        <Col xs={{ size: 12 }} className="mb-5 pb-5">
          <Col xs={{ size: 12 }} className="my-5 componentTitle">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }} className="piesContainer">
            <Col xs={{ size: 5 }}>
              <Pie data={data[0]} options={options[0]} />
            </Col>
            <Col xl={{ size: 5 }}>
              <Pie data={data[1]} options={options[1]} />
            </Col>
          </Col>
          <Col xs={{ size: 12 }} className="d-flex justify-content-center">
            <Col xl={{ size: 5 }}>
              <Pie data={data[2]} options={options[2]} />
            </Col>
          </Col>
        </Col>
      </Row>
      <Row className="d-block d-lg-none">
        <Col xs={{ size: 12 }} className="mb-5 pb-5">
          <Col xs={{ size: 12 }} className="my-5 componentTitle">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }}>
            <Pie data={data[0]} options={options2[0]} width={100} />
          </Col>
          <Col xs={{ size: 12 }}>
            <Pie data={data[1]} options={options2[1]} width={100} />
          </Col>
          <Col xs={{ size: 12 }}>
            <Pie data={data[2]} options={options2[2]} width={100} />
          </Col>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const ResultText = props => {
  let result = 0;

  props.dataFetch.map(data => {
    result += data[props.index];
    return false;
  });
  result = (result / props.dataFetch.length).toFixed(2);

  return (
    <React.Fragment>
      <Row>
        <Col xs={{ size: 12 }} className="mb-5 pb-5">
          <Col xs={{ size: 12 }} className="my-5 componentTitle">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }} className="d-flex justify-content-center">
            La moyenne des salariés ayant répondu est de{" "}
            <span className="dataResultText">{result}€</span>
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
