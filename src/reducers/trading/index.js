import { combineReducers } from 'redux';

import { tradingReducer as trading } from '../../routes/Trading';
import {
  priceReducer as prices,
  positionReducer as positions,
} from '../../routes/Trading/components/Positions';
import { reducer as trades } from '../../routes/Trading/components/Trades';
import { reducer as balance } from '../../routes/Trading/components/Positions/components/BalanceCards';

export default combineReducers({
  trading,
  prices,
  positions,
  trades,
  balance,
});
