import { combineReducers } from 'redux';

import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import modal from './modal';
import trading from './trading';

export default combineReducers({
  loadingBar,
  trading,
  modal,
});
