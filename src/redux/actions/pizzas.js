import axios from "axios";

import { SET_PIZZAS } from "../action_types";

export const fetchPizzas = () => async (dispatch) => {
  const axiosObj = await axios.get(
    "http://localhost:3001/pizzas?_sort=price&_order=desc"
  );
  dispatch(setPizzas(axiosObj.data));
};

export function setPizzas(items) {
  return {
    type: SET_PIZZAS,
    payload: items,
  };
}
