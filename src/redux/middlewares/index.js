import { loadingBarMiddleware } from 'react-redux-loading-bar';
import thunkMiddleware from 'redux-thunk';

const promiseTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILED'];

const logger = (store) => (next) => (action) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

export default [
  thunkMiddleware,
  logger,
  loadingBarMiddleware({ promiseTypeSuffixes }),
];
