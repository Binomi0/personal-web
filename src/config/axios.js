import axios from 'axios';

axios.defaults.headers['CB-ACCESS-KEY'] = 'Z0ESHoXU4EEG3LkI';
axios.defaults.headers['CB-ACCESS-TIMESTAMP'] = Date.now();

axios.interceptors.response.use(({ data }) => data.data);

export default axios;
