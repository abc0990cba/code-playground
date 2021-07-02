import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import axios from 'axios';

import { Header } from './components';
import { Home, Cart } from './pages';


function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch("http://localhost:3000/db.json");
      // const data = await res.json();

      const axiosObj = await axios.get("http://localhost:3000/db.json");
      setPizzas(axiosObj.data.pizzas);
      
    };
    fetchData();
  }, []);

  console.log(pizzas);

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <Route path="/" render={() => <Home items={pizzas}/>} exact />
        <Route path="/cart" component={Cart} exact />
      </div>
    </div>
  );
}

export default App;
