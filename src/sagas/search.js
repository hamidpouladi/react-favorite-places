import {call, put, takeLatest, delay} from 'redux-saga/effects';
import {getLocations} from '../api/search';
import {
  SEARCH_INPUT_CHANGED,
  SEARCH_API_REQUESTING,
  SEARCH_API_SUCCESS,
  SEARCH_API_FAILURE,
} from '../actions/search/actionTypes';

function* fetchLocations(action) {
  try {
    yield put({type: SEARCH_API_REQUESTING});
    yield delay(150);
    const {text} = action.payload;
    if (!text || text.length === 1) return;
    const data = yield call(getLocations, action.payload);
    yield put({type: SEARCH_API_SUCCESS, payload: data?.data});
  } catch (err) {
    yield put({type: SEARCH_API_FAILURE, error: err.response?.data});
  }
}

function* search() {
  yield takeLatest(SEARCH_INPUT_CHANGED, fetchLocations);
}

export default search;
