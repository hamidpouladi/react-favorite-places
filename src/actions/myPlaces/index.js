import {OPEN_MY_PLACES, CLOSE_MY_PLACES} from './actionTypes';

export function showMyPlaces() {
  return {
    type: OPEN_MY_PLACES,
  };
}

export function closeMyPlaces() {
  return {
    type: CLOSE_MY_PLACES,
  };
}
