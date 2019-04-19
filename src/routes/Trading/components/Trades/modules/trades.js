import createReducer from '../../../../../redux/create-reducer';
// import axios from '../../../../../config/axios';
import moment from 'moment';

import firebase from '../../../../../config/firebase';

const getTrades = () => (dispatch) => {
  const DAX = firebase.database().ref('/market/DAX/trades');
  const DOW = firebase.database().ref('/market/DOW/trades');

  const daxTrades = [];
  const us30Trades = [];
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

  DAX.on('child_added', (snapshot) => {
    result += snapshot.val().result;
    operations.push(result);
    daxTrades.push(parseTrades(snapshot.val()));
    dispatch({
      type: 'TRADING_GET_TRADES_SUCCESS',
      payload: { DAX: daxTrades },
    });
    dispatch({
      type: 'TRADING_CALCULATE_EQUITY_SUCCESS',
      payload: operations,
    });
  });

  DOW.on('child_added', (snapshot) => {
    result += snapshot.val().result;
    operations.push(result);
    us30Trades.push(parseTrades(snapshot.val()));
    dispatch({
      type: 'TRADING_GET_TRADES_SUCCESS',
      payload: { DOW: us30Trades },
    });
    dispatch({
      type: 'TRADING_CALCULATE_EQUITY_SUCCESS',
      payload: operations,
    });
  });
};

export const actions = {
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
  TRADING_GET_TRADES_SUCCESS: (state, { payload }) => ({
    ...state,
    market: { ...state.market, ...payload },
  }),
  TRADING_CALCULATE_EQUITY_SUCCESS: (state, { payload }) => ({
    ...state,
    equity: [...payload],
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
