import {
  NEW_PLACE_SUBMITED,
  NEW_PLACE_PIN_ADDED,
  PLACE_EDITED,
  PLACE_REMOVE_CONFIRMATION,
  NEW_PLACE_CANCELED,
  PLACE_FORM_CLOSED,
  PLACE_EDITING,
} from './actionTypes';

export function addNewPin(payload) {
  return {
    type: NEW_PLACE_PIN_ADDED,
    payload,
  };
}

export function cancelPlace() {
  return {
    type: NEW_PLACE_CANCELED,
  };
}

export function closePlaceForm() {
  return {
    type: PLACE_FORM_CLOSED,
  };
}

export function submitPlace(payload) {
  return {
    type: NEW_PLACE_SUBMITED,
    payload,
  };
}

export function editPlace(payload) {
  return {
    type: PLACE_EDITING,
    payload,
  };
}

export function submitEditedPlace(id) {
  return {
    type: PLACE_EDITED,
    id,
  };
}

export function removePlace(id) {
  return {
    type: PLACE_REMOVE_CONFIRMATION,
    id,
  };
}
