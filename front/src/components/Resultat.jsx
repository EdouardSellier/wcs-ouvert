import React, { Component } from "react";
import posed from "react-pose";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import questions from "./questions";
import { Pie } from "react-chartjs-2";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import "./css/Resultat.css";

const Square = posed.div({
  start: {
    height: "0%"
  },
  end: {
    height: "100%",
    transition: { delay: 100 }
  }
});

const StyledSquare = styled(Square)`
  width: 100%;
  background: linear-gradient(to left, blue 60%, white 70%, blue 100%);
  border-radius: 8px 8px 0px 0px;
  box-shadow: 6px 0px 8px 0px;
  overflow: hidden;
  word-wrap: break-word;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultBar = props => {
  return (
    <React.Fragment>
      <Row className="d-flex justify-content-center mb-5">
        <Col
          xs={{ size: 10 }}
          className="bg-light d-flex justify-content-center"
        >
          <Col xs={{ size: 10 }} className=" mb-5 pb-5 px-5 d-none d-lg-block">
            <Col xs={{ size: 12 }} className="py-3">
              Le titre
            </Col>
            <Col xs={{ size: 12 }} className="">
              <Row>
                <Col xs={{ size: 8, offset: 4 }} className="d-flex px-0">
                  <Col xs={{ size: 1 }} className="px-1 d-flex">
                    0%
                  </Col>
                  <Col xs={{ size: 4 }}>25%</Col>
                  <Col xs={{ size: 2 }}>50%</Col>
                  <Col xs={{ size: 4 }}>75%</Col>
                  <Col xs={{ size: 1 }} className="px-1 textAlignRight">
                    100%
                  </Col>
                </Col>

                <Col
                  xs={{ size: 8, offset: 4 }}
                  className="px-0 containerResultBar pb-1"
                >
                  <Col
                    xs={{ size: 12 }}
                    className="d-flex px-0"
                    style={{ height: "50%" }}
                  >
                    <Col xs={{ size: 1 }} className="borderRight pt-2" />
                    <Col xs={{ size: 1 }} className="borderRight pt-2" />
                    <Col xs={{ size: 1 }} className="borderRight pt-3" />
                    <Col xs={{ size: 1 }} className="borderRight pt-2" />
                    <Col xs={{ size: 1 }} className="borderRight pt-2" />
                    <Col xs={{ size: 1 }} className="borderRight pt-3" />
                    <Col xs={{ size: 1 }} className="borderRight pt-2" />
                    <Col xs={{ size: 1 }} className="borderRight pt-2" />
                    <Col xs={{ size: 1 }} className="borderRight pt-3" />
                    <Col xs={{ size: 1 }} className="borderRight pt-2" />
                    <Col xs={{ size: 1 }} className="borderRight pt-2" />
                    <Col xs={{ size: 1 }} className="borderRight pt-3" />
                  </Col>
                </Col>
                <Col xs={{ size: 4 }} className="pt-2">
                  {/**/}
                  <Col xs={{ size: 12 }} className="alignItems">
                    bggrherher hrehrhrehrehre hrrehehreher herhrherheer
                    herreherherhre heherheherh hehthtrhrth htrhrthtrtrhhtrtrh
                    rhthtr htrh trhtr htr htr hrt htr hrt htr hrt hrt htr tr
                  </Col>
                </Col>
                <Col xs={{ size: 8 }} className="borderLeft pt-2 px-0">
                  {/**/}
                  <Col
                    xs={{ size: 12 }}
                    className="px-0"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%"
                    }}
                  >
                    <div
                      className="bg-dark my-2 text-white"
                      style={{
                        width: "50%",
                        display: "flex",
                        height: "6vh",

                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      jjjjjjjjjjjjjjjjjj
                    </div>
                  </Col>
                </Col>
              </Row>
            </Col>
          </Col>
        </Col>
      </Row>
      {/*<Row>
        <Col md={{ size: 10 }} className="test mb-5 pb-5 d-none d-lg-block">
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
                      ).toFixed(1) + " %"}
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
                <Col xs={{ size: 8 }} className="text-white">
                  {data}
                </Col>
                <Col xs={{ size: 4 }} className="text-white">
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
                      </Row>*/}
    </React.Fragment>
  );
};

const ResultPie = props => {
  let possibilities = [];
  props.possibilities.map(data => possibilities.push(data));
  possibilities.push("------");

  let pies = { pie1: [], pie2: [], pie3: [] };
  props.possibilities.map(data =>
    pies.pie1.push(
      props.dataFetch.filter(state => state[props.index + "one"] === data)
        .length
    )
  );

  possibilities.map(data =>
    pies.pie2.push(
      props.dataFetch.filter(state => state[props.index + "two"] === data)
        .length
    )
  );

  possibilities.map(data =>
    pies.pie3.push(
      props.dataFetch.filter(state => state[props.index + "three"] === data)
        .length
    )
  );

  let tabName = [];
  props.possibilities.map(data => tabName.push(data));
  tabName.push("Aucun");

  let color = [
    "#aad7a9",
    "#348b5",
    "#3cd74b",
    "#fd62d9",
    "#cda889",
    "#bfb1e5",
    "#c5eff2",
    "#3bf859",
    "#5f8a01",
    "#b604cf",
    "#66354f"
  ];
  const data = [
    {
      labels: tabName,
      datasets: [
        {
          data: pies.pie1,
          backgroundColor: color
        }
      ]
    },
    {
      labels: tabName,
      datasets: [
        {
          data: pies.pie2,
          backgroundColor: color
        }
      ]
    },
    {
      labels: tabName,
      datasets: [
        {
          data: pies.pie3,
          backgroundColor: color
        }
      ]
    }
  ];

  const options = [
    {
      title: {
        display: true,
        text: "Priorité 1.",
        fontFamily: "Roboto",
        fontSize: 13
      },
      legend: {
        position: "left",
        labels: {
          fontSize: 11
        }
      }
    },
    {
      title: {
        display: true,
        text: "Priorité 2.",
        fontFamily: "Roboto",
        fontSize: 13
      },
      legend: {
        position: "left",
        labels: {
          fontSize: 11
        }
      }
    },
    {
      title: {
        display: true,
        text: "Priorité 3.",
        fontFamily: "Roboto",
        fontSize: 13
      },
      legend: {
        position: "left",
        labels: {
          fontSize: 11
        }
      }
    }
  ];

  const options2 = [
    {
      title: {
        display: true,
        text: "Priorité 1.",
        fontFamily: "Roboto",
        fontSize: 13
      },
      legend: {
        display: false
      }
    },
    {
      title: {
        display: true,
        text: "Priorité 2.",
        fontFamily: "Roboto",
        fontSize: 13
      },
      legend: {
        display: false
      }
    },
    {
      title: {
        display: true,
        text: "Priorité 3.",
        fontFamily: "Roboto",
        fontSize: 13
      },
      legend: {
        display: false
      }
    }
  ];

  return (
    <React.Fragment>
      <Row className="d-none d-lg-block">
        <Col xs={{ size: 12 }} className="mb-5 pb-5 px-5">
          <Col xs={{ size: 12 }} className="my-5 componentTitle">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }} className="piesContainer pt-4">
            <Col xs={{ size: 5 }}>
              <Pie data={data[0]} options={options[0]} />
            </Col>
            <Col xl={{ size: 5 }}>
              <Pie data={data[1]} options={options[1]} />
            </Col>
          </Col>
          <Col
            xs={{ size: 12 }}
            className="bgWhiteOpac d-flex justify-content-center pb-5"
          >
            <Col xl={{ size: 5 }} className="">
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
          <Col xs={{ size: 12 }} className="bgWhiteOpac">
            <Pie data={data[0]} options={options2[0]} width={100} />
          </Col>
          <Col xs={{ size: 12 }} className="bgWhiteOpac">
            <Pie data={data[1]} options={options2[1]} width={100} />
          </Col>
          <Col xs={{ size: 12 }} className="bgWhiteOpac">
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
          <Col
            xs={{ size: 12 }}
            className="d-flex justify-content-center contentResultText"
          >
            La moyenne des salariés ayant répondu est de{" "}
            <span className="dataResultText">{result}€</span>
          </Col>
        </Col>
      </Row>
    </React.Fragment>
  );
};

class Resultat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: true,
      dataFetch: [
        {
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
          commun_transport_one:
            "J’utilise déjà souvent les transports en commun",
          commun_transport_two: "------",
          commun_transport_three: "------",
          bike_one: "Je me déplace déjà souvent à vélo",
          bike_two: "------",
          bike_three: "------",
          carpooling_one: "Je covoiture déjà souvent",
          carpooling_two: "------",
          carpooling_three: "------",
          otherThanCar: "",
          commentary: ""
        }
      ]
    };
  }

  handlePdf(imga) {
    let newPdf = new jsPDF();
    newPdf.text(15, 15, "Compte-rendu de la géolocalisation de vos salariés :");
    newPdf.setFontSize(30);
    const allImages = imga.reverse();

    allImages.map(image => {
      newPdf.addImage(image, "JPEG", 20, 20, 200, 100);

      return newPdf.addPage();
    });

    let lastPage = newPdf.internal.getNumberOfPages();
    newPdf.deletePage(lastPage);

    newPdf.save("compte-rendu.pdf");
  }

  handleImg() {
    const capture1 = document.querySelector(".test");

    let allCaptures = [];

    allCaptures.push(capture1);

    let allImagesData = [];

    allCaptures.map(capture => {
      return domtoimage.toPng(capture).then(dataUrl => {
        let imgData = new Image();

        imgData = new Image(100, 100);

        imgData.src = dataUrl;
        allImagesData.push(imgData);
        this.setState({
          imgData: allImagesData
        });
        this.handlePdf(allImagesData);
      });
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/monespace");
  };

  componentDidMount() {
    fetch("http://localhost:8080/states", {
      method: "POST"
    })
      .then(results => results.json())
      .then(data => {
        this.setState({
          dataFetch: data,
          hovering: true
        });
      });
  }

  render() {
    return (
      <div className="container-fluid mt-2">
        <Row>
          <Col lg={{ size: 2 }} className="pb-4">
            <button className="mt-2 btn text-white" onClick={this.handleSubmit}>
              Revenir à l'accueil
            </button>
          </Col>
          <Col lg={{ size: 8 }}>
            <h2 className="text-white">
              <b>Consulter les résultats de mon enquête</b>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col lg={{ size: 12 }} className="contentTotalResult mt-5">
            <b>{this.state.dataFetch.length}</b> salarié(s) ayant répondu au
            sondage pour l'instant.
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
            /*case "multipleOption":
              return (
                <ResultPie
                  possibilities={data.possibilities}
                  index={data.index}
                  dataFetch={this.state.dataFetch}
                  label={data.label}
                />
              );
            case "number":
              return (
                <ResultText
                  possibilities={data.possibilities}
                  index={data.index}
                  dataFetch={this.state.dataFetch}
                  label={data.label}
                />
              );*/
            default:
              return false;
          }
        })}

        <Row>
          <Col xs={{ size: 12 }} className="pb-5">
            <button
              onClick={() => this.handleImg()}
              className="mb-4 mt-3 btn btn-lg text-white pdfButton"
            >
              <i className="fa fa-file-pdf-o" /> Télécharger PDF
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Resultat;
