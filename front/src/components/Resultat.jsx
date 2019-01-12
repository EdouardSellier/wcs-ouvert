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
      <Col
        lg={{ size: 6 }}
        className="d-flex bidule justify-content-center mt-5"
      >
        <Col xs={{ size: 12 }} className="mb-5 pb-5 pr-5 px-0 bg-light">
          <Col xs={{ size: 12 }} className="componentTitle my-4 px-5">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }} className="px-0">
            <Row id={props.number}>
              {props.possibilities.map(data => (
                <React.Fragment>
                  <Col xs={{ size: 4 }} className="pt-2 pr-0 bidule">
                    {/**/}
                    <Col xs={{ size: 12 }} className="alignItems pr-1">
                      {data}
                    </Col>
                  </Col>
                  <Col xs={{ size: 7 }} className="borderLeft pt-2 px-0">
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
                        className="bg-dark text-white"
                        style={{
                          width:
                            100 /
                              (props.dataFetch.length /
                                props.dataFetch.filter(
                                  dataFetch => dataFetch[props.index] === data
                                ).length) +
                            "%",
                          display: "flex",
                          height: "3vh",

                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden"
                        }}
                      >
                        {100 /
                          (props.dataFetch.length /
                            props.dataFetch.filter(
                              dataFetch => dataFetch[props.index] === data
                            ).length) +
                          "%"}
                      </div>
                    </Col>
                  </Col>
                </React.Fragment>
              ))}
              <Col
                xs={{ size: 7, offset: 4 }}
                className="px-0 containerResultBar"
              >
                <Col xs={{ size: 12 }} className="d-flex px-0 pt-2">
                  <Col xs={{ size: 3 }} className="borderRight px-0 pt-2" />
                  <Col xs={{ size: 3 }} className="borderRight px-0 pt-2" />
                  <Col xs={{ size: 3 }} className="borderRight px-0 pt-2" />
                  <Col xs={{ size: 3 }} className="borderRight px-0 pt-2" />
                </Col>
              </Col>
              <Col xs={{ size: 7, offset: 4 }} className="d-flex px-0">
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
            </Row>
          </Col>
        </Col>
      </Col>
    </React.Fragment>
  );
};

const ResultPie = props => {
  let possibilities = [];
  props.possibilities.map(data => possibilities.push(data));
  possibilities.push("------");

  let pies = { pie1: [], pie2: [], pie3: [] };
  possibilities.map(data =>
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
    "#348b54",
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

  let idTab = 0;
  return (
    /*<React.Fragment>
      <Col xs={{ size: 12 }} className="d-flex justify-content-center my-5">
        <Col xs={{ size: 12 }} className="bg-light pb-5 px-4">
          <Col xs={{ size: 12 }} className="mt-4 componentTitle">
            {props.label}
          </Col>
          <Col xs={{ size: 12 }} className="mt-5 mb-4  px-5">
            <Row className="d-flex justify-content-left">
              {tabName.map(data => {
                idTab += 1;

                return (
                  <Col lg={{ size: 6 }}>
                    <Col xs={{ size: 12 }} className="d-flex vbn my-1">
                      <Col xs={{ size: 4 }} className="align">
                        <Col
                          xs={{ size: 8 }}
                          className="border ccc"
                          style={{ backgroundColor: color[idTab - 1] }}
                        >
                          {" "}
                        </Col>
                      </Col>
                      <Col xs={{ size: 8 }} className="alignItemss">
                        {data}
                      </Col>
                    </Col>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Row>
            <Col lg={{ size: 4 }} className="">
              <Pie data={data[0]} options={options[0]} />
            </Col>
            <Col lg={{ size: 4 }} className="">
              <Pie data={data[1]} options={options[1]} />
            </Col>
            <Col lg={{ size: 4 }} className="">
              <Pie data={data[2]} options={options[2]} />
            </Col>
          </Row>
        </Col>
      </Col>
    </React.Fragment>*/
    <Col lg={{ size: 6 }} className="d-flex justify-content-center mt-5">
      <Col xs={{ size: 12 }} className="mb-5 pb-5 pr-5 px-0 bg-light">
        <Col xs={{ size: 12 }} className="componentTitle my-4 px-5">
          {props.label}
        </Col>
        <Row id={props.number}>
          <Col xs={{ size: 8 }}>
            {tabName.map(data => {
              idTab += 1;

              return (
                <Col lg={{ size: 12 }}>
                  <Col xs={{ size: 12 }} className="d-flex vbn my-1">
                    <Col xs={{ size: 4 }} className="align">
                      <Col
                        xs={{ size: 8 }}
                        className="border ccc"
                        style={{ backgroundColor: color[idTab - 1] }}
                      >
                        {" "}
                      </Col>
                    </Col>
                    <Col xs={{ size: 8 }} className="alignItemss">
                      {data}
                    </Col>
                  </Col>
                </Col>
              );
            })}
          </Col>
          <Col xs={{ size: 4 }}>
            <Col lg={{ size: 12 }}>
              <Pie
                data={data[0]}
                options={options[0]}
                width={100}
                height={100}
              />
            </Col>
            <Col lg={{ size: 12 }}>
              <Pie
                data={data[1]}
                options={options[1]}
                width={100}
                height={100}
              />
            </Col>
            <Col lg={{ size: 12 }} className="">
              <Pie
                data={data[2]}
                options={options[2]}
                width={100}
                height={100}
              />
            </Col>
          </Col>
        </Row>
      </Col>
    </Col>
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
      <Col xs={{ size: 9 }} className="mb-5 pb-5 bg-light">
        <Col xs={{ size: 12 }} className="my-5 componentTitle">
          {props.label}
        </Col>
        <Col
          xs={{ size: 12 }}
          className="d-flex justify-content-center contentResultText"
          id={props.number}
        >
          La moyenne des salariés ayant répondu est de{" "}
          <span className="dataResultText">{result}€</span>
        </Col>
      </Col>
    </React.Fragment>
  );
};

class Resultat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: true,
      dataFetch: []
    };
  }

  handlePdf(imga) {
    let newPdf = new jsPDF();
    newPdf.text(15, 15, "Compte-rendu de la géolocalisation de vos salariés :");
    const allImages = imga;
    newPdf.setFontSize(10);
    newPdf.text(90, 30, "Vous êtes :");
    newPdf.addImage(allImages[3], "JPEG", 0, 35, -100, 40);
    newPdf.text(90, 95, "Vous avez :");
    newPdf.addImage(allImages[6], "JPEG", 0, 100, -100, 40);

    newPdf.text(
      38,
      165,
      `        Quels modes de déplacements utilisez-vous pour venir travailler ?
    Si vous utilisez plusieurs modes de déplacements au cours de votre trajet 
    domicile-travail, veuillez les renseigner dans l'ordre dimportance qu'ils ont 
        dans votre parcours (en termes de temps et de distance)`
    );

    newPdf.addImage(allImages[18], "JPEG", 25, 185, 150, 100);

    newPdf.addPage();

    newPdf.text(
      42,
      15,
      `                Peut-être utilisez-vous occasionnellement d'autres modes 
      de déplacements en fonction du jour de la semaine,  de vos horaires,
                                                  de la météo...`
    );

    newPdf.addImage(allImages[19], "JPEG", 25, 30, 150, 100);

    newPdf.text(
      42,
      170,
      `Quelle(s) raison(s) motive(nt) le choix de votre mode de déplacements principal ? `
    );

    newPdf.addImage(allImages[12], "JPEG", 25, 180, 150, 100);

    newPdf.addPage();

    newPdf.text(64, 15, `Quelle distance (en km) parcourez-vous pour :`);

    newPdf.addImage(allImages[0], "JPEG", -58, 20, 320, 10);

    newPdf.text(60, 50, `Combien de temps (en minutes) mettez-vous pour :`);

    newPdf.addImage(allImages[2], "JPEG", -57, 55, 320, 10);

    newPdf.text(65, 85, `Quel budget (en euros) dépensez-vous pour :`);

    newPdf.addImage(allImages[1], "JPEG", -57, 90, 320, 10);

    newPdf.text(
      35,
      135,
      `Quels éléments prenez-vous en compte pour organiser vos déplacements domicile-travail ?`
    );

    newPdf.addImage(allImages[16], "JPEG", 25, 150, 150, 100);

    newPdf.addPage();

    newPdf.text(
      25,
      15,
      "Si vous vous rendez en voiture sur votre lieu de travail, y-trouvez-vous facilement une place de parking ?"
    );

    newPdf.addImage(allImages[4], "JPEG", 0, 22, -100, 40);

    newPdf.text(65, 83, "Où déjeunez-vous le plus souvent le midi ?");

    newPdf.addImage(allImages[5], "JPEG", 0, 90, -100, 40);

    newPdf.text(
      45,
      152,
      "En moyenne, à quelle fréquence effectuez-vous des déplacements le midi ?"
    );

    newPdf.addImage(allImages[7], "JPEG", 0, 159, -100, 40);

    newPdf.text(
      45,
      220,
      "Lorsque vous vous déplacez le midi, quel mode de transport utilisez-vous principalement ?"
    );

    newPdf.addImage(allImages[13], "JPEG", 0, 227, -100, 40);

    newPdf.addPage();

    newPdf.text(
      50,
      15,
      "A quelle fréquence effectuez-vous des déplacements professionnels ?"
    );
    newPdf.addImage(allImages[8], "JPEG", 0, 22, -100, 40);

    newPdf.text(
      47,
      80,
      `A quelle distance (aller ou retour, en km) vous déplacez-vous en moyenne 
                         pour les déplacements professionnels ?`
    );
    newPdf.addImage(allImages[9], "JPEG", 0, 87, -100, 40);

    newPdf.text(
      47,
      130,
      `Pour vos déplacements professionnels, quel mode de déplacements utilisez-vous principalement ?`
    );
    newPdf.addImage(allImages[14], "JPEG", 0, 137, -100, 40);

    newPdf.text(
      47,
      180,
      `Si vous utilisez votre voiture personnelle pour des déplacements professionnels, pour quelle raison ?`
    );
    newPdf.addImage(allImages[10], "JPEG", 0, 187, -100, 40);

    newPdf.addPage();

    newPdf.text(
      10,
      30,
      `Parmi les affirmations ci-dessous, laquelle correspond le plus à la manière dont 
              vous vous déplacez pour vous rendre sur votre lieu de travail ?`
    );
    newPdf.addImage(allImages[11], "JPEG", 0, 35, -100, 40);

    newPdf.text(
      38,
      165,
      `Parmi ces propositions, lesquelles vous inciteraient à utiliser davantage les transports en commun ?`
    );

    newPdf.addImage(allImages[15], "JPEG", 25, 185, 150, 100);

    newPdf.addPage();
    newPdf.text(
      38,
      10,
      `Parmi ces mesures, lesquelles vous inciteraient à utiliser davantage le vélo ?`
    );

    newPdf.addImage(allImages[20], "JPEG", 25, 20, 150, 100);

    newPdf.text(
      38,
      180,
      `Parmi ces mesures, lesquelles vous inciteraient davantage à covoiturer ?`
    );

    newPdf.addImage(allImages[17], "JPEG", 25, 190, 150, 100);

    newPdf.save("compte-rendu.pdf");
  }

  handleImg() {
    const capture1 = document.getElementById("1");
    const capture2 = document.getElementById("2");
    const capture3 = document.getElementById("3");
    const capture4 = document.getElementById("4");
    const capture5 = document.getElementById("5");
    const capture6 = document.getElementById("6");
    const capture7 = document.getElementById("7");
    const capture8 = document.getElementById("8");
    const capture9 = document.getElementById("9");
    const capture10 = document.getElementById("10");
    const capture11 = document.getElementById("11");
    const capture12 = document.getElementById("12");
    const capture13 = document.getElementById("13");
    const capture14 = document.getElementById("14");
    const capture15 = document.getElementById("15");
    const capture16 = document.getElementById("16");
    const capture17 = document.getElementById("17");
    const capture18 = document.getElementById("18");
    const capture19 = document.getElementById("19");
    const capture20 = document.getElementById("20");
    const capture21 = document.getElementById("21");

    let allCaptures = [];

    allCaptures.push(capture1);
    allCaptures.push(capture2);
    allCaptures.push(capture3);
    allCaptures.push(capture4);
    allCaptures.push(capture5);
    allCaptures.push(capture6);
    allCaptures.push(capture7);
    allCaptures.push(capture8);
    allCaptures.push(capture9);
    allCaptures.push(capture10);
    allCaptures.push(capture11);
    allCaptures.push(capture12);
    allCaptures.push(capture13);
    allCaptures.push(capture14);
    allCaptures.push(capture15);
    allCaptures.push(capture16);
    allCaptures.push(capture17);
    allCaptures.push(capture18);
    allCaptures.push(capture19);
    allCaptures.push(capture20);
    allCaptures.push(capture21);
    let allImagesData = [];

    allCaptures.map(capture => {
      return domtoimage.toPng(capture).then(dataUrl => {
        let imgData = new Image();

        imgData = new Image(1000, 1000);

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
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/user/resultat", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(results => results.json())
      .then(data => {
        let dataFetch = data.filter(
          survey =>
            survey.id_rh === this.props.location.state.currentId &&
            survey.survey_name === this.props.location.state.surveyNameSelected
        );

        this.setState({
          dataFetch: dataFetch,
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
        <Row className="px-5 mt-5 d-flex justify-content-center">
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
                    number={data.number}
                  />
                );
              case "multipleOption":
                return (
                  <ResultPie
                    possibilities={data.possibilities}
                    index={data.index}
                    dataFetch={this.state.dataFetch}
                    label={data.label}
                    number={data.number}
                  />
                );
              case "number":
                return (
                  <ResultText
                    possibilities={data.possibilities}
                    index={data.index}
                    dataFetch={this.state.dataFetch}
                    label={data.label}
                    number={data.number}
                  />
                );
              default:
                return false;
            }
          })}
        </Row>
        <Row>
          <Col xs={{ size: 12 }} className="pb-5 mt-5">
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
