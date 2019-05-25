import axios from 'axios';

// axios.defaults.headers['CB-ACCESS-KEY'] = 'Z0ESHoXU4EEG3LkI';
// axios.defaults.headers['CB-ACCESS-TIMESTAMP'] = Date.now();

if (process.env.NODE_ENV !== 'development') {
  const URL = `${process.env.REACT_APP_API_URL}/${
    process.env.REACT_APP_API_VERSION
  }`;
  axios.defaults.baseURL = URL;
} else {
  const URL = `${process.env.REACT_APP_LOCAL_API_URL}/${
    process.env.REACT_APP_API_VERSION
  }`;
  axios.defaults.baseURL = URL;
}

export default axios;
