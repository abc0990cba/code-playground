import { FiltersActionTypes, sortByType } from "../../types/filters";

export const setSortBy: any = (payload: sortByType) => ({
  type: FiltersActionTypes.SET_SORT_BY,
  payload,
});

export const setCategory: any = (catIndex: number) => ({
  type: FiltersActionTypes.SET_CATEGORY,
  payload: catIndex,
});
