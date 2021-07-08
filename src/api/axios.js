// Default config options
import axios from 'axios';

const defaultOptions = {
  baseURL: 'https://map.ir/search/v2',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
let instance = axios.create(defaultOptions);

// Set the api key
instance.interceptors.request.use(function (req) {
  req.headers['x-api-key'] = process.env.REACT_APP_API_KEY;
  return req;
});

export default instance;
