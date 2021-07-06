import { SET_SORT_BY, SET_CATEGORY } from "../action_types";

export function setSortBy({ type, order }) {
  return {
    type: SET_SORT_BY,
    payload: { type, order },
  };
}

export function setCategory(categIndex) {
  return {
    type: SET_CATEGORY,
    payload: categIndex,
  };
}
