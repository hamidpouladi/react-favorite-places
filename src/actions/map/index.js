import {MAP_POSITION_CHANGED, ADD_TO_SEARCH_HISTORY} from './actionTypes';

export function updatePosition(payload) {
  return {
    type: MAP_POSITION_CHANGED,
    payload,
  };
}

export function addToSearchHistory(payload) {
  return {
    type: ADD_TO_SEARCH_HISTORY,
    payload,
  };
}
