import { combineReducers } from 'redux';

import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import { reducer as trading } from '../routes/Trading';
import ig from '../routes/Trading/modules/ig';
import positions from '../routes/Trading/components/Positions/modules/positions';

export default combineReducers({
  loadingBar,
  trading,
  ig,
  positions,
});
