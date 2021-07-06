import axios from "axios";

import { SET_PIZZAS, SET_LOADED } from "../action_types";

const setLoaded = (payload) => ({
  type: SET_LOADED,
  payload,
})

export const fetchPizzas = (category, sortBy) => async (dispatch) => {

  dispatch(setLoaded(false));
  const axiosObj = await axios.get("http://localhost:3001/pizzas", {
    params: {
      category: category,
      _sort: sortBy.type,
      _order: sortBy.order,
    },
  });
  dispatch(setPizzas(axiosObj.data));
  dispatch(setLoaded(true));
};

export function setPizzas(items) {
  return {
    type: SET_PIZZAS,
    payload: items,
  };
}
