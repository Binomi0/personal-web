import { combineReducers } from 'redux';

import ig from '../routes/Trading/modules/ig';
import positions from '../routes/Trading/components/Positions1/modules/positions';

export default combineReducers({
  ig,
  positions,
});
