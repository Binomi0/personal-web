import axios from 'axios';

// axios.defaults.headers['CB-ACCESS-KEY'] = 'Z0ESHoXU4EEG3LkI';
// axios.defaults.headers['CB-ACCESS-TIMESTAMP'] = Date.now();

if (process.env.NODE_ENV !== 'development') {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
} else {
  axios.defaults.baseURL = process.env.REACT_APP_LOCAL_API_URL;
}

export default axios;
