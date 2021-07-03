import { SET_PIZZAS } from "../action_types";

export function setPizzas(items) {
  return {
    type: SET_PIZZAS,
    payload: items,
  };
}
