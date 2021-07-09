import {PizzaObject} from "../../types/pizzas";
import {  CartActionTypes} from "../../types/cart";

export const addPizzaToCart: any = (pizza: PizzaObject) => ({
  type: CartActionTypes.ADD_PIZZA_CART,
  payload: pizza,
});

export const clearCart: any = () => ({
  type: 'CLEAR_CART',
});

export const removeCartItem: any = (id: number) => ({
  type: 'REMOVE_CART_ITEM',
  payload: id,
});

export const plusCartItem: any = (id: number) => ({
  type: 'PLUS_CART_ITEM',
  payload: id,
});

export const minusCartItem: any = (id: number) => ({
  type: 'MINUS_CART_ITEM',
  payload: id,
});
