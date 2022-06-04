export interface PizzaObject {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  size: number;
  type: string;
}

export interface IPizzaState {
  items: PizzaObject[];
  isLoaded: boolean;
}

export enum PizzaActionTypes {
  SET_PIZZAS = "SET_PIZZAS",
  SET_LOADED = "SET_LOAD",
}

interface ISetPizzasAction {
  type: PizzaActionTypes.SET_PIZZAS;
  payload: PizzaObject[];
}

interface ISetLoadedAction {
  type: PizzaActionTypes.SET_LOADED;
  payload: boolean;
}

export type PizzaAction = ISetPizzasAction | ISetLoadedAction;
