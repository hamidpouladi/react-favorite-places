import axios from './axios';

export function getLocations(data) {
  return axios.post('autocomplete', data);
}
