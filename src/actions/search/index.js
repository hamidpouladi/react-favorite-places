import {SEARCH_INPUT_CHANGED} from './actionTypes';

export function search(payload) {
  return {
    type: SEARCH_INPUT_CHANGED,
    payload,
  };
}
