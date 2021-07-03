import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";

import { Header } from "./components";
import { Home, Cart } from "./pages";
import { setPizzas } from "./redux/actions/pizzas";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch("http://localhost:3000/db.json");
      // const data = await res.json();

      const axiosObj = await axios.get("http://localhost:3000/db.json");
      dispatch(setPizzas(axiosObj.data.pizzas));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
      </div>
    </div>
  );
}

export default App;
