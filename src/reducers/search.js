import {
  SEARCH_API_REQUESTING,
  SEARCH_API_SUCCESS,
  SEARCH_API_FAILURE,
} from '../actions/search/actionTypes';

const initialState = {
  data: [],
  fetching: false,
  error: null,
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_API_REQUESTING: {
      return {
        ...state,
        fetching: true,
      };
    }
    case SEARCH_API_SUCCESS: {
      return {
        data: action.payload?.value,
        fetching: false,
      };
    }
    case SEARCH_API_FAILURE: {
      return {
        data: [],
        fetching: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
