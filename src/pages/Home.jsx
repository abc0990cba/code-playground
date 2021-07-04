import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchPizzas } from "../redux/actions/pizzas";
import { Categories, SortPopup, PizzaCard } from "../components";

import { setCategory } from "../redux/actions/filters";

const sortItems = [
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "alphabet" },
];

const pizzaType = ["Мясная", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);

  const onSelectItem = useCallback(
    (index) => {
      dispatch(setCategory(index));
    },
    [dispatch]
  );

     useEffect(() => {
       dispatch(fetchPizzas());
     }, [dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={pizzaType} onClickItem={onSelectItem} />
        <SortPopup items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items && items.map((item) => <PizzaCard key={item.id} {...item} />)}
      </div>
    </div>
  );
}

export default Home;
