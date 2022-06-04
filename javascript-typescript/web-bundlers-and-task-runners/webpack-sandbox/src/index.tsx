import Post from "./models/post";
import "@/styles/styles.css";
import "@/styles/scss.scss";

import webpackImg from "./assets/webpack-logo.png";
// import json from "@/assets/json";
// import xml from "@/assets/data.xml";
// import csv from "@/assets/data.csv";

// import * as _ from "lodash";

import "./babel";
import { render } from "react-dom";

const post = new Post("Webpack", webpackImg);
console.log("post.toString(): ", post);

import React from "react";

// console.log("JSON: ", json);
// console.log("XML: ", xml);
// console.log("CSV: ", csv);
// console.log("lodash(_.defaults(obj1, obj2)): ", _.defaults({ k: 2 }, { k: 1, s: 6 }));

const App = () => {
  return (
    <div className="container">
      <h1>Hello Webpack!</h1>
      <hr />
      <div className="logo"></div>
      <hr />
      <div className="card">
        <h2>It is card with scss styles</h2>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app"));
