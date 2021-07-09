import {PizzaObject} from "./pizzas";

interface PizzaInCard {
  items: PizzaObject[],
  totalPrice: number,
}

export interface ICartState {
  items: PizzaInCard[];
  totalPrice: number;
  totalCount: number;
}

export enum CartActionTypes {
  ADD_PIZZA_CART = "ADD_PIZZA_CART",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  PLUS_CART_ITEM = "PLUS_CART_ITEM",
  MINUS_CART_ITEM = "MINUS_CART_ITEM",
  CLEAR_CART = "CLEAR_CART",
}

export interface IAddPizzaToCartAction {
  type: CartActionTypes.ADD_PIZZA_CART;
  payload: PizzaObject;
}

export interface IRemoveCartItemAction {
  type: CartActionTypes.REMOVE_CART_ITEM;
  payload: number;
}

export interface IPlusCartItemAction {
  type: CartActionTypes.PLUS_CART_ITEM;
  payload: number;
}

export interface IMinusCartItemAction {
  type: CartActionTypes.MINUS_CART_ITEM;
  payload: number;
}

export interface IClearCartAction {
  type: CartActionTypes.CLEAR_CART;
}

export type CartAction =
  | IAddPizzaToCartAction
  | IRemoveCartItemAction
  | IPlusCartItemAction
  | IMinusCartItemAction
  | IClearCartAction;
