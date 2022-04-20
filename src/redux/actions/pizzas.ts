import axios from "axios";
import { Dispatch } from "redux";
import { sortByType } from "../../types/filters";
import { PizzaAction, PizzaActionTypes, PizzaObject } from "../../types/pizzas";

export const setLoaded: any = (payload: boolean) => ({
  type: PizzaActionTypes.SET_LOADED,
  payload,
});

export const fetchPizzas: any =
  (sortBy: sortByType, category: string) =>
  (dispatch: Dispatch<PizzaAction>) => {
    dispatch({
      type: PizzaActionTypes.SET_LOADED,
      payload: false,
    });

    axios
      .get("http://localhost:3001/pizzas", {
        params: {
          category: category,
          _sort: sortBy.type,
          _order: sortBy.order,
        },
      })
      .then(({ data }) => {
        dispatch(setPizzas(data));
      });
  };

// export const fetchPizzas = (category, sortBy) => async (dispatch) => {
//   dispatch(setLoaded(false));
//   const axiosObj = await axios.get("http://localhost:3001/pizzas", {
//     params: {
//       category: category,
//       _sort: sortBy.type,
//       _order: sortBy.order,
//     },
//   });
//   dispatch(setPizzas(axiosObj.data));
//   dispatch(setLoaded(true));
// };

export const setPizzas: any = (items: PizzaObject[]) => ({
  type: PizzaActionTypes.SET_PIZZAS,
  payload: items,
});
