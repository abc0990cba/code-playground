export interface ICartState {
  items: any[];
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

interface AddPizzaCartAction {
  type: CartActionTypes.ADD_PIZZA_CART;
  payload: object | any;
}

interface RemoveCartItemAction {
  type: CartActionTypes.REMOVE_CART_ITEM;
  payload: number;
}

interface PlusCartItemAction {
  type: CartActionTypes.PLUS_CART_ITEM;
  payload: number;
}

interface MinusCartItemAction {
  type: CartActionTypes.MINUS_CART_ITEM;
  payload: number;
}

interface ClearCartAction {
  type: CartActionTypes.CLEAR_CART;
}

export type CartAction =
  | AddPizzaCartAction
  | RemoveCartItemAction
  | PlusCartItemAction
  | MinusCartItemAction
  | ClearCartAction;
