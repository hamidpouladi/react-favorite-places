import React, {useRef} from 'react';
import {v4 as uuid} from 'uuid';
import {useSelector, useDispatch} from 'react-redux';
import {
  addNewPin,
  removePlace,
  cancelPlace,
  editPlace,
  closePlaceForm,
  submitPlace,
} from './actions/place';
import {showMyPlaces, closeMyPlaces} from './actions/myPlaces';
import {
  PLACE_REMOVE_CANCELED,
  PLACE_REMOVE_CONFIRMED,
  CLOSE_CONFIRMATION_MODAL,
} from './actions/place/actionTypes';
import Map from './components/map';
import {addToSearchHistory} from './actions/map';
import PlaceForm from './components/placeForm';
import MyPlacesButton from './components/buttons/MyPlacesButton';
import FindMyLocationButton from './components/buttons/FindMyLocationButton';
import SearchBar from './components/searchBar';
import MyPlaces from './components/myPlaces';
import Dialog from './components/Dialog';
import Confirm from './components/confirm';
import './App.css';

export const MapContext = React.createContext();

export default function App() {
  const mapRef = useRef(null);
  const {
    pins,
    showPlaceForm,
    placeFormAction,
    selectedPlace,
    showConfirmModal,
  } = useSelector(state => state.places);
  const {position} = useSelector(state => state.map);
  const {isOpenMyPlaces} = useSelector(state => state.myPlaces);
  const dispatch = useDispatch();

  const handleAddNewPin = e => {
    const newPin = {id: uuid(), ...e.latlng};
    dispatch(addNewPin(newPin));
  };

  const handleCancelPlaceForm = () => {
    if (placeFormAction === 'add') {
      dispatch(cancelPlace());
    }
    if (placeFormAction === 'edit') {
      dispatch(closePlaceForm());
    }
  };

  const handleSubmitPlace = data => {
    dispatch(submitPlace(data));
  };

  const handleEditPlace = place => {
    dispatch(editPlace(place));
  };

  const handleRemovePlace = place => {
    dispatch(removePlace(place.id));
  };

  const handleSelectLocation = location => {
    const {
      current: {leafletElement: map},
    } = mapRef;

    const {geom: {coordinates = []} = {}} = location;

    if (coordinates.length) {
      map.flyTo([...coordinates].reverse(), 14, {
        duration: 2,
      });
    }
    dispatch(addToSearchHistory(location));
  };

  const handleTrackMyLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      location => {
        const {latitude, longitude} = location.coords;
        const {
          current: {leafletElement: map},
        } = mapRef;
        map.flyTo([longitude, latitude].reverse(), 14, {
          duration: 2,
        });
      },
      err => {
        console.log('Unable to access your location', err);
      },
      options,
    );
    return;
  };

  return (
    <MapContext.Provider value={mapRef.current}>
      <SearchBar onSelectLocation={handleSelectLocation} />
      <Map
        ref={mapRef}
        position={position}
        pins={pins}
        onMapClick={handleAddNewPin}
        onRemovePlace={handleRemovePlace}
        onEditPlace={handleEditPlace}
        showPopup={!showPlaceForm}
      />
      {pins.length > 0 ? (
        <MyPlacesButton onClick={() => dispatch(showMyPlaces())} />
      ) : null}
      <FindMyLocationButton onClick={handleTrackMyLocation} />
      <MyPlaces
        open={isOpenMyPlaces}
        onClose={() => dispatch(closeMyPlaces())}
      />
      <Dialog
        title={
          selectedPlace && placeFormAction === 'edit'
            ? 'Edit Location '
            : 'Add Location'
        }
        open={showPlaceForm}
        onClose={handleCancelPlaceForm}
        direction="up"
      >
        <PlaceForm
          onSubmit={handleSubmitPlace}
          onCancel={handleCancelPlaceForm}
          defaultValues={
            selectedPlace && placeFormAction === 'edit'
              ? {
                  title: selectedPlace?.title,
                  description: selectedPlace?.description,
                }
              : undefined
          }
        />
      </Dialog>
      <Confirm
        open={showConfirmModal}
        acceptText="Delete"
        declineText="Cancel"
        onDecline={() => dispatch({type: PLACE_REMOVE_CANCELED})}
        onAccept={() => dispatch({type: PLACE_REMOVE_CONFIRMED})}
        onClose={() => dispatch({type: CLOSE_CONFIRMATION_MODAL})}
      />
    </MapContext.Provider>
  );
}
