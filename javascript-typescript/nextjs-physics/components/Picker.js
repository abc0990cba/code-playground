import React, { useEffect, useState } from "react";
import classes from "../styles/picker.module.css";

//component pick formula for boundary conditions
export const Picker = ({ formula, setFormula, formulas, title}) => {
  //
  // const [formula, setFormula] = useState(" - 2 + 2t");
  // const formulas = {
  //   formula1: " + 1 - 2t^2",
  //   formula2: " - 2 + 2t",
  //   formula3: " + 3 + t^2",
  // };

  const changeFormula = (e) => {
    const id = e.target.id;
    setFormula(formulas[id]);
  };


  return (
    <form action="#">
      <div className={`row`}>
        <label className={`col s1 ${classes.text}`}>{title}</label>
      </div>
      <div className={`row ${classes.items}`}>
        {formulas.map((elem, index) => {
          return (
            <label key={index}>
              <input
                className={`${classes.radio}`}
                name="group1"
                id={index}
                type="radio"
                checked={elem == formula && "checked"}
                onChange={changeFormula}
              />
              <span>{formulas[index]}</span>
            </label>
          );
        })}
      </div>
    </form>
  );
};
