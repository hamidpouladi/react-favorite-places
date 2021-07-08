import produce from 'immer';
import {
  MAP_POSITION_CHANGED,
  ADD_TO_SEARCH_HISTORY,
} from '../actions/map/actionTypes';

const initialState = {
  position: {center: {lat: 32.4279, lng: 53.688}, zoom: 6},
  history: [],
};

export default function map(state = initialState, action) {
  switch (action.type) {
    case MAP_POSITION_CHANGED: {
      return {
        ...state,
        position: action.payload,
      };
    }
    case ADD_TO_SEARCH_HISTORY: {
      return {
        ...state,
        history: produce(state.history, draft => {
          if (draft.length >= 5) {
            draft.splice(-1, 1);
            draft.unshift(action.payload);
          } else {
            draft.unshift(action.payload);
          }
        }),
      };
    }
    default:
      return state;
  }
}
