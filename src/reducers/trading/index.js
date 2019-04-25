import { combineReducers } from 'redux';

import { reducer as prices } from '../../routes/Trading';
import { reducer as positions } from '../../routes/Trading/components/Positions';
import { reducer as trades } from '../../routes/Trading/components/Trades';
import { reducer as balance } from '../../routes/Trading/components/BalanceCards';

export default combineReducers({
  prices,
  positions,
  trades,
  balance,
});
