import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchPizzas } from "../redux/actions/pizzas";
import {
  Categories,
  SortPopup,
  PizzaCard,
  PizzaLoadingCard,
} from "../components";

import { setCategory, setSortBy } from "../redux/actions/filters";

const sortItems = [
  { name: "популярности", type: "rating", order: "desc" },
  { name: "цене", type: "price", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" },
];

const pizzaType = ["Мясная", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

function Home() {
  const dispatch = useDispatch();

  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const onSelectCategory = useCallback(
    (index) => {
      dispatch(setCategory(index));
    },
    [dispatch]
  );

  const onSelectSortType = useCallback(
    (sortType) => {
      dispatch(setSortBy(sortType));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [dispatch, category, sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          items={pizzaType}
          onClickCategory={onSelectCategory}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((item) => <PizzaCard key={item.id} {...item} />)
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingCard key={index} />)}
      </div>
    </div>
  );
}

export default Home;
