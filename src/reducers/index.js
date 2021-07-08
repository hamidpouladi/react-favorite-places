import {combineReducers} from 'redux';
import places from './places.js';
import search from './search.js';
import map from './map.js';
import myPlaces from './myPlaces.js';

const rootReducer = combineReducers({
  places,
  search,
  map,
  myPlaces,
});

export default rootReducer;
