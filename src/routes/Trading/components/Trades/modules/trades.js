import moment from 'moment';
import axios from '../../../../../config/axios';
import createReducer from '../../../../../redux/create-reducer';
import { GET_TRADES, CALCULATE_EQUITY } from '../../../../../action-types';
import { getPositions } from '../../Positions/modules/positions';
import { MARKETS } from '../../../modules/constants';
import orderTrades from '../../../../../utils/orderTrades';

const MAX_GRAPH_OPERATIONS = 240;

export const getTrades = () => async (dispatch) => {
  dispatch({ type: GET_TRADES.REQUEST });

  try {
    const URL = 'trading/trades';
    const response = await axios(URL);
    const tradeList = response.data.sort(orderTrades);

    // console.log('response.data', response.data);
    const daxTrades = [];
    const dowTrades = [];
    const operations = [];
    let result = 0;

    function parseTrades(trade) {
      return [
        moment(trade.finishTime).format('DD/MM/YY HH:MM'),
        trade.enterPrice,
        trade.exitPosition.exitPrice,
        trade.direction,
        trade.result,
      ];
    }

    tradeList.forEach((trade) => {
      if (trade.market === MARKETS.DAX) {
        daxTrades.push(parseTrades(trade));
      }
      if (trade.market === MARKETS.DOW) {
        dowTrades.push(parseTrades(trade));
      }
      result += trade.result;
      operations.push(result);
    });

    const trades = {
      DAX: daxTrades,
      DOW: dowTrades,
    };

    dispatch({ type: GET_TRADES.SUCCESS });
    dispatch({ type: GET_TRADES.SET, payload: trades });
    dispatch({
      type: CALCULATE_EQUITY.SET,
      payload: operations.slice(
        operations.length - MAX_GRAPH_OPERATIONS,
        operations.length,
      ),
    });
  } catch (err) {
    console.error(err);
    dispatch({ type: GET_TRADES.FAILURE });
  }
};

// Transforma la posición en una operación terminada
export const finishTrade = (_currentPosition, _exitPosition, _market) => async (
  dispatch,
  getState,
) => {
  console.log('_currentPosition', _currentPosition);
  console.log('_exitPosition', _exitPosition);
  let result = _exitPosition.exitPrice - _currentPosition.mediumPrice;
  if (_exitPosition.direction === 'Short') {
    result = -result;
  }
  const newTrade = {
    enterPrice: _currentPosition.mediumPrice,
    quantity: Number(parseInt(_currentPosition.quantity, 10)),
    startTrade: _currentPosition.startTrade,
    exitPosition: _exitPosition,
    finishTime: Date.now(),
    // result: _currentPosition.amount,
    result: result * _currentPosition.quantity,
    direction: _exitPosition.direction,
    market: _market,
  };

  // console.log('newTrade', newTrade);

  const tradeURL = 'trading/trade';
  await axios.post(tradeURL, newTrade);

  dispatch(getTrades());
  dispatch(getPositions());
};

export const actions = {
  finishTrade,
  getTrades,
};

const defaultState = {
  market: {
    DAX: [],
    DOW: [],
  },
  equity: [],
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  [GET_TRADES.SET]: (state, { payload }) => ({
    ...state,
    market: { ...state.market, ...payload },
  }),
  [CALCULATE_EQUITY.SET]: (state, { payload }) => ({
    ...state,
    equity: [...payload],
  }),
};
export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
