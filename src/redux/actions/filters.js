import { SET_SORT_BY, SET_CATEGORY } from '../action_types';

export function sortBy( sortType ){
    return {
        type: SET_SORT_BY,
        payload: sortType,
    };
}


export function setCategory( categIndex) {
  return {
    type: SET_CATEGORY,
    payload: categIndex,
  };
}