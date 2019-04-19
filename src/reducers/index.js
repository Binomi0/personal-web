import { combineReducers } from 'redux';

import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import trading from './trading';

export default combineReducers({
  loadingBar,
  trading,
});
