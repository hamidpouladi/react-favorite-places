import {all} from 'redux-saga/effects';
import search from './search';
import {removePlace} from './place';

function* rootSaga() {
  yield all([search(), removePlace()]);
}

export default rootSaga;
