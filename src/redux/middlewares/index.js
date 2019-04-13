import { loadingBarMiddleware } from 'react-redux-loading-bar';
import thunkMiddleware from 'redux-thunk';

const promiseTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILED'];

export default [
  thunkMiddleware,
  loadingBarMiddleware({ promiseTypeSuffixes }),
];
