import {OPEN_MY_PLACES, CLOSE_MY_PLACES} from '../actions/myPlaces/actionTypes';

const initialState = {
  isOpenMyPlaces: false,
};

export default function myPlaces(state = initialState, action) {
  switch (action.type) {
    case OPEN_MY_PLACES: {
      return {
        isOpenMyPlaces: true,
      };
    }
    case CLOSE_MY_PLACES: {
      return {
        isOpenMyPlaces: false,
      };
    }
    default:
      return state;
  }
}
