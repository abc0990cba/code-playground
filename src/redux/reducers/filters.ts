import {
  IFiltersState,
  FiltersAction,
  FiltersActionTypes,
} from "../../types/filters";

const initialState: IFiltersState = {
  category: null,
  sortBy: {
    type: "rating",
    order: "desc",
  },
};

export const filters = (
  state: IFiltersState = initialState,
  action: FiltersAction
): IFiltersState => {
  switch (action.type) {
    case FiltersActionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case FiltersActionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};
