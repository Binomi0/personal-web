import axios from 'axios';

export default {
  authenticate: async () => {
    axios.defaults.headers['X-IG-API-KEY'] =
      '6341e585e8494b65a728977d62104a767fd166b7';
    axios.defaults.headers['VERSION'] = 2;
    const auth = await axios.post(
      'https://demo-api.ig.com/gateway/deal/session',
      {
        identifier: 'onrubia',
        password: 'ar12003',
      },
    );

    return auth;
  },
  getPrice: () => {},
};
