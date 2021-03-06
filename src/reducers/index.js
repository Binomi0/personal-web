import { combineReducers } from 'redux';

import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import { chatActions as chat } from '../routes/Trading/components/Chat';
import modal from './modal';
import user from './user';
import drawer from './drawer';
import trading from './trading';
import auth from './auth';

export default combineReducers({
  loadingBar,
  trading,
  modal,
  user,
  drawer,
  auth,
  chat,
});
