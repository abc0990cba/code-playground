import { SET_PIZZAS, SET_LOADED } from "../action_types";

const initialState = {
  items: [],
  isLoaded: false,
};

export default function pizzas(state = initialState, action) {
  switch (action.type) {
    case SET_PIZZAS:
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };
    case SET_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
}
