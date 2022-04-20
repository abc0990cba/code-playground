import {IPizzaState, PizzaAction, PizzaActionTypes} from "../../types/pizzas";

const initialState: IPizzaState = {
  items: [],
  isLoaded: false,
};

export const pizzas = (state: IPizzaState = initialState, action: PizzaAction) => {
  switch (action.type) {
    case PizzaActionTypes.SET_PIZZAS:
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };

    case PizzaActionTypes.SET_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };

    default:
      return state;
  }
};

