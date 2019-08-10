import { loadingBarMiddleware } from 'react-redux-loading-bar';
import thunkMiddleware from 'redux-thunk';

const promiseTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILED'];
const myMiddleware = (state) => () => next => {
  console.log('state =>', state);
  next();
};

export default [
  thunkMiddleware,
  myMiddleware,
  loadingBarMiddleware({ promiseTypeSuffixes }),
];

