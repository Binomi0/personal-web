import { combineReducers } from 'redux';

import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import { reducer as trading } from '../routes/Trading';

export default combineReducers({
  loadingBar,
  trading,
});
