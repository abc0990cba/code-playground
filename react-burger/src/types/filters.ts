export type sortByType = { type: string; order: string }

export interface IFiltersState {
  category: null | number;
  sortBy: sortByType;
}

export enum FiltersActionTypes {
  SET_SORT_BY = "SET_SORT_BY",
  SET_CATEGORY = "SET_CATEGORY",
}

interface SetSortByAction{
    type: FiltersActionTypes.SET_SORT_BY,
    payload: sortByType,
}

interface SetCategoryAction {
    type: FiltersActionTypes.SET_CATEGORY,
    payload: null | number,
}

export type FiltersAction = SetSortByAction | SetCategoryAction;