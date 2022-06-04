import React, { useState } from "react";
import { MainLayout } from "../components/MainLayout";
import classes from "../styles/physics.module.css";
import { Formula } from "../components/Formula";
import { Graphics } from "../components/Graphics";
import { Picker } from "../components/Picker";


export default function HeatEquation({ title, firstLayer, lastLayer }) {

  //for gradient
  const maxTemperature = Math.max(firstLayer, lastLayer);
  const minTemperature = Math.min(firstLayer, lastLayer);


  //coefficient of thermal conductivity
  const formulasCoeff = ["1", "1/2", "5"];
  const [formulaCoeff, setFormulaCoeff] = useState(formulasCoeff[1]);

  //heat source and heat sink
  const formulasSource = ["0", " + 1 - 2t^2", " + 1 - 2xt"];
  const [formulaSource, setFormulaSource] = useState(formulasSource[1]);

  //boundary conditions x=0
  const formulasBoundaryStart = ["0", "0.5t", "0.3"];
  const [formulaBoundaryStart, setFormulaBoundaryStart] = useState(
    formulasBoundaryStart[1]
  );

  //boundary conditions x=1
  const formulasBoundaryEnd = ["0", "2", "4.3 + t"];
  const [formulaBoundaryEnd, setFormulaBoundaryEnd] = useState(
    formulasBoundaryEnd[1]
  );


  //initial conditions t=0
  const formulasInit = ["0", "(x+1)sin((pix)/2)", "2x(x+1) + 0.3"];
  const [formulaInit, setFormulaInit] = useState(formulasInit[1]);

  //formulas
  const generalFormFormula =
    "(partialU(x,t))/(partialt) =  a^2(partial^2U(x,t))/(partial^2x) + f(x,t)";
  const specialCaseFormula = `(partialU(x,t))/(partialt) = ${formulaCoeff} (partial^2U(x,t))/(partial^2x) ${formulaSource}`;

  //initial conditions
  const initConditFormula1 = `U(0,t) = ${formulaBoundaryStart}`;
  const initConditFormula2 = `U(1,t) = ${formulaBoundaryEnd}`;

  //boundary conditions
  const boundaryCondFormula = `U(x,0) = ${formulaInit}`;

  return (
    
      <MainLayout title="Physics">
        <div className={classes.title + " " + classes.text}>
          <h1>{title}</h1>
        </div>
        <div className={classes.title}>
          <label>Температурный профиль момент времени t=0</label>
        </div>
        <div className={classes.graphics}>
          <Graphics
            data={firstLayer}
            maxElem={maxTemperature}
            minElem={minTemperature}
          />
        </div>
        <div className={classes.title}>
          <label>Температурный профиль в момент времени t=2</label>
        </div>
        <div className={classes.graphics}>
          <Graphics
            data={lastLayer}
            maxElem={maxTemperature}
            minElem={minTemperature}
          />
        </div>
        <div className={"row" + " " + classes.page + " " + classes.text}>
          <div className="col s11">
            <div className="col s12">
              <div className="row">
                <label className="col s1">Общий вид:</label>
                <div className={classes.formula + "col s2"}>
                  <Formula formula={generalFormFormula} />
                </div>
              </div>
              <div className="row">
                <label className="col s1">Частный случай:</label>
                <div className={classes.formula + "col s12"}>
                  <Formula formula={specialCaseFormula} />
                </div>
              </div>
              <div className="row">
                <label className="col s1">Начальные условия:</label>
                <div className={classes.formula + "col s2"}>
                  <Formula formula={initConditFormula1} />
                </div>
              </div>
              <div className="row">
                <label className="col s1">Начальные условия:</label>
                <div className={classes.formula + "col s2"}>
                  <Formula formula={initConditFormula2} />
                </div>
              </div>
              <div className="row">
                <label className="col s1">Краевые условия:</label>
                <div className={classes.formula + "col s2"}>
                  <Formula formula={boundaryCondFormula} />
                </div>
              </div>
              <div className="row">
                <a className="waves-effect blue darken-4 btn-large">
                  Рассчитать температурный профиль
                </a>
              </div>
            </div>
          </div>
          <div className="col s12">
            <Picker
              title={"Коэффициент теплопроводности"}
              formulas={formulasCoeff}
              setFormula={setFormulaCoeff}
              formula={formulaCoeff}
            />
            <Picker
              title={"Источник(поглотитель) тепла"}
              formulas={formulasSource}
              setFormula={setFormulaSource}
              formula={formulaSource}
            />
            <Picker
              title={"Граничные условия при x = 0"}
              formulas={formulasBoundaryStart}
              setFormula={setFormulaBoundaryStart}
              formula={formulaBoundaryStart}
            />
            <Picker
              title={"Граничные условия при x = 1"}
              formulas={formulasBoundaryEnd}
              setFormula={setFormulaBoundaryEnd}
              formula={formulaBoundaryEnd}
            />
            <Picker
              title={"Начальные условия при t = 0"}
              formulas={formulasInit}
              setFormula={setFormulaInit}
              formula={formulaInit}
            />
          </div>
        </div>
      </MainLayout>
  );
}

export async function getStaticProps(context) {
  const response = await fetch(
    process.env.API_URL + "api/echo"
  );
  const data = await response.json();

  return {
    props: {
      title: "УРАВНЕНИЕ ТЕПЛОПРОВОДНОСТИ",
      firstLayer: data.data[0],
      lastLayer: data.data[1],
    },
  };
}


// HeatEquation.getInitialProps = async () => {
//   const response = await fetch(
//     process.env.API_URL + "api/echo"
//   );
//   const data = await response.json();

//   return {
//     title: "Уравнение теплопроводности",
//     firstLayer: data.data[0],
//     lastLayer: data.data[1],
//   };
// };


