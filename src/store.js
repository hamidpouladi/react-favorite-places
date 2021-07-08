import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import mySaga from './sagas';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['search', 'myPlaces'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducers = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  let store = createStore(
    persistedReducers,
    undefined,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  let persistor = persistStore(store);

  sagaMiddleware.run(mySaga);

  return {store, persistor};
}
