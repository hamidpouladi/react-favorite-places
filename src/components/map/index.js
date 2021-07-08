import PropTypes from 'prop-types';
import {forwardRef} from 'react';
import {Map, TileLayer, Marker, Tooltip} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import Popup from './popup';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export const LeafletMap = forwardRef(
  (
    {
      position,
      pins = [],
      onMapClick,
      onEditPlace,
      onRemovePlace,
      showPopup = true,
    },
    ref,
  ) => (
    <Map
      ref={ref}
      onClick={onMapClick}
      className="map"
      center={position.center}
      zoom={position.zoom}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {pins.map((place, index) => {
        return (
          <Marker key={index} position={place}>
            {showPopup ? (
              <Popup
                headerTitle="Location Details"
                title={place.title}
                description={place.description}
                onRemove={() => onRemovePlace(place)}
                onEdit={() => onEditPlace(place)}
              />
            ) : null}

            <Tooltip>{place.title}</Tooltip>
          </Marker>
        );
      })}
    </Map>
  ),
);

LeafletMap.propTypes = {
  position: PropTypes.object,
  pins: PropTypes.arrayOf(PropTypes.object),
  onMapClick: PropTypes.func,
  onEditPlace: PropTypes.func,
  onRemovePlace: PropTypes.func,
  showPopup: PropTypes.bool,
};

export default LeafletMap;
