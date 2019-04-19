import { combineReducers } from 'redux';

import { reducer as prices } from '../../routes/Trading';
import { reducer as positions } from '../../routes/Trading/components/Positions';
import { reducer as trades } from '../../routes/Trading/components/Trades';

export default combineReducers({
  prices,
  positions,
  trades,
});
