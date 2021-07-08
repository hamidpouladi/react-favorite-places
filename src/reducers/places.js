import {
  NEW_PLACE_PIN_ADDED,
  NEW_PLACE_CANCELED,
  NEW_PLACE_SUBMITED,
  PLACE_REMOVED,
  PLACE_EDITED,
  PLACE_FORM_CLOSED,
  PLACE_EDITING,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL,
} from '../actions/place/actionTypes';
import produce from 'immer';

const initialState = {
  selectedPlace: null,
  showPlaceForm: false,
  placeFormAction: 'add',
  showConfirmModal: false,
  pins: [],
};

export default function places(state = initialState, action) {
  switch (action.type) {
    case NEW_PLACE_PIN_ADDED: {
      return {
        ...state,
        selectedPlace: action.payload.pin,
        pins: [...state.pins, action.payload],
        placeFormAction: 'add',
        showPlaceForm: true,
      };
    }
    case NEW_PLACE_CANCELED: {
      return {
        ...state,
        pins: produce(state.pins, draft => {
          draft.pop();
        }),
        showPlaceForm: false,
        selectedPlace: null,
      };
    }
    case PLACE_FORM_CLOSED: {
      return {
        ...state,
        showPlaceForm: false,
        selectedPlace: null,
      };
    }
    case NEW_PLACE_SUBMITED: {
      return {
        ...state,
        showPlaceForm: false,
        pins: produce(state.pins, draft => {
          draft[draft.length - 1] = {
            ...draft[draft.length - 1],
            ...action.payload,
          };
        }),
        selectedPlace: null,
      };
    }
    case PLACE_EDITING: {
      return {
        ...state,
        placeFormAction: 'edit',
        showPlaceForm: true,
        selectedPlace: action.payload,
      };
    }
    case PLACE_EDITED: {
      return {
        showPlaceForm: false,
        pins: produce(state, draft => {
          const index = draft.findIndex(
            place => place.id === state.selectedPlace?.id,
          );
          if (index !== -1) draft[index] = {...draft[index], ...action.payload};
        }),
        selectedPlace: null,
      };
    }
    case PLACE_REMOVED: {
      return {
        ...state,
        showConfirmModal: false,
        pins: produce(state.pins, draft => {
          const index = draft.findIndex(place => place.id === action.id);
          if (index !== -1) draft.splice(index, 1);
        }),
      };
    }
    case OPEN_CONFIRMATION_MODAL: {
      return {
        ...state,
        showPlaceForm: false,
        showConfirmModal: true,
      };
    }
    case CLOSE_CONFIRMATION_MODAL: {
      return {
        ...state,
        showConfirmModal: false,
      };
    }
    default:
      return state;
  }
}
