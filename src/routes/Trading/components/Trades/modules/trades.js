import createReducer from '../../../../../redux/create-reducer';
import axios from '../../../../../config/axios';
import moment from 'moment';

import { GET_TRADES, CALCULATE_EQUITY } from '../../../../../action-types';
import { MARKETS } from '../../../modules/constants';

export const getTrades = () => async (dispatch) => {
  dispatch({ type: GET_TRADES.REQUEST });

  try {
    const URL = '/v1/trading/trades';
    const response = await axios(URL);

    // console.log('response.data', response);
    const daxTrades = [];
    const dowTrades = [];
    const operations = [];
    let result = 0;

    function parseTrades(trade) {
      return [
        moment(trade.finishTime).format('DD/MM/YY HH:MM'),
        trade.enterPrice,
        trade.onExitPosition.exitPrice,
        trade.direction,
        trade.result,
      ];
    }

    response.data.forEach((trade) => {
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

    console.log(trades);
    dispatch({ type: GET_TRADES.SUCCESS });
    dispatch({ type: GET_TRADES.SET, payload: trades });
    dispatch({ type: CALCULATE_EQUITY.SET, payload: operations });
  } catch (err) {
    console.error(err);
    dispatch({ type: GET_TRADES.FAILURE });
  }
};

// const getTrades = () => (dispatch) => {
//   const DAX = firebase.database().ref('/market/DAX/trades');
//   const DOW = firebase.database().ref('/market/DOW/trades');

//   const daxTrades = [];
//   const dowTrades = [];
//   const operations = [];
//   let result = 0;

//   function parseTrades(trade) {
//     return [
//       moment(trade.finishTime).format('DD/MM/YY HH:MM'),
//       trade.enterPrice,
//       trade.onExitPosition.exitPrice,
//       trade.direction,
//       trade.result,
//     ];
//   }

//   DAX.on('child_added', (snapshot) => {
//     result += snapshot.val().result;
//     operations.push(result);
//     daxTrades.push(parseTrades(snapshot.val()));
//     dispatch({
//       type: 'TRADING_GET_TRADES_SUCCESS',
//       payload: { DAX: daxTrades },
//     });
//     dispatch({
//       type: 'TRADING_CALCULATE_EQUITY_SUCCESS',
//       payload: operations,
//     });
//   });

//   DOW.on('child_added', (snapshot) => {
//     result += snapshot.val().result;
//     operations.push(result);
//     dowTrades.push(parseTrades(snapshot.val()));
//     dispatch({
//       type: 'TRADING_GET_TRADES_SUCCESS',
//       payload: { DOW: dowTrades },
//     });
//     dispatch({
//       type: 'TRADING_CALCULATE_EQUITY_SUCCESS',
//       payload: operations,
//     });
//   });
// };

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
