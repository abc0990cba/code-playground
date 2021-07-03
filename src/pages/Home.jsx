import React from "react";
import { useSelector } from "react-redux";

import { Categories, SortPopup, PizzaCard } from "../components";

function Home() {
  const { items } = useSelector(({ pizzas }) => {
    return {
      items: pizzas.items,
    };
  });

  const sortItems = [
    { name: "популярности", type: "popular" },
    { name: "цене", type: "price" },
    { name: "алфавиту", type: "alphabet" },
  ];

  const pizzaType = ["Мясная", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={pizzaType} />
        <SortPopup items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.map((item) => (
          <PizzaCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
