import {race, put, take, takeEvery} from 'redux-saga/effects';
import {
  PLACE_REMOVE_CONFIRMATION,
  PLACE_REMOVE_CONFIRMED,
  PLACE_REMOVE_CANCELED,
  PLACE_REMOVED,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL,
} from '../actions/place/actionTypes';

export function* confirm(action) {
  const {id} = action;
  yield put({type: OPEN_CONFIRMATION_MODAL});
  const {canceled} = yield race({
    confirmed: take(PLACE_REMOVE_CONFIRMED),
    canceled: take(PLACE_REMOVE_CANCELED),
  });
  if (canceled) {
    yield put({type: CLOSE_CONFIRMATION_MODAL});
  } else {
    yield put({type: PLACE_REMOVED, id});
  }
}

export function* removePlace() {
  yield takeEvery(PLACE_REMOVE_CONFIRMATION, confirm);
}
