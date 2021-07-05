import { SET_CATEGORY, SET_SORT_BY } from '../action_types'

const initialState = {
  sortBy: "rating",
  category: null,
};



export default function filters(state = initialState, action){
  switch (action.type) {
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
}

