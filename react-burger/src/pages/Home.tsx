import React from "react";

import {
  Categories,
  SortPopup,
  PizzaBlock,
  PizzaLoadingCard,
} from "../components";

import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";
import { useTypeSelector, useTypeDispatch } from "../hooks/hooks";
import { PizzaObject } from "../types/pizzas";

const categoryNames = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
const sortIems = [
  { name: "популярности", type: "rating", order: "desc" },
  { name: "цене", type: "price", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" },
];

const Home: React.FC = () => {
  const dispatch = useTypeDispatch();
  const items = useTypeSelector(({ pizzas }) => pizzas.items);
  const cartItems = useTypeSelector(({ cart }) => cart.items);
  const isLoaded = useTypeSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useTypeSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [dispatch, category, sortBy]);

  const onSelectCategory = React.useCallback(
    (index) => {
      dispatch(setCategory(index));
    },
    [dispatch]
  );

  const onSelectSortType = React.useCallback(
    (type) => {
      dispatch(setSortBy(type));
    },
    [dispatch]
  );

  const handleAddPizzaToCart = (pizza: PizzaObject) => {
    dispatch(addPizzaToCart(pizza));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortIems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj: PizzaObject) => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingCard key={index} />)}
      </div>
    </div>
  );
};

export default Home;
