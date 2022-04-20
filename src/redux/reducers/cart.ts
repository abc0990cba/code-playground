import { ICartState, CartAction, CartActionTypes } from "../../types/cart";

const initialState: ICartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr: any) =>
  arr.reduce((sum: number, obj: any) => obj.price + sum, 0);

const _get = (obj: any, path: any) => {
  const [firstKey, ...keys] = path.split(".");
  return keys.reduce((val: any, key: any) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj: object, path: any) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

export const cart = (
  state: ICartState = initialState,
  action: CartAction
): ICartState => {
  switch (action.type) {
    case CartActionTypes.ADD_PIZZA_CART: {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case CartActionTypes.REMOVE_CART_ITEM: {
      const newItems: any[] = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case CartActionTypes.PLUS_CART_ITEM: {
      const newObjItems: any = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case CartActionTypes.MINUS_CART_ITEM: {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case CartActionTypes.CLEAR_CART: {
      return { totalPrice: 0, totalCount: 0, items: [] };
    }
    default:
      return state;
  }
};
