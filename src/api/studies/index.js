import axios from 'axios';
// import Promise from 'bluebird';

axios.defaults.baseURL = 'http://localhost:3001';

const mockedStudies = ['Javascript', 'NodeJS', 'ReactJS'];

export default {
  getAll: async () => {
    try {
      const URL = '/studies';
      const response = await axios(URL);

      return response;
    } catch (err) {
      console.error(err);
      return mockedStudies;
    }
  },
  getOne: () => {},
  create: () => {},
  update: () => {},
  delete: () => {},
};
