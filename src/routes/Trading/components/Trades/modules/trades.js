import moment from 'moment';
import axios from '../../../../../config/axios';
import createReducer from '../../../../../redux/create-reducer';
import { GET_TRADES, CALCULATE_EQUITY } from '../../../../../action-types';
// import calculateContracts from '../../../../../utils/trading/calculateContracts';
// import calculateMediumPrice from '../../../../../utils/trading/calculateMediumPrice';
// import { getCryptoBalance } from './balance';
import { getPositions } from '../../Positions/modules/positions';
import { MARKETS } from '../../../modules/constants';

export const getTrades = () => async (dispatch) => {
  dispatch({ type: GET_TRADES.REQUEST });

  try {
    const URL = '/v1/trading/trades';
    const response = await axios(URL);

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

    dispatch({ type: GET_TRADES.SUCCESS });
    dispatch({ type: GET_TRADES.SET, payload: trades });
    dispatch({ type: CALCULATE_EQUITY.SET, payload: operations });
  } catch (err) {
    console.error(err);
    dispatch({ type: GET_TRADES.FAILURE });
  }
};

// Transforma la posición en una operación terminada
export const finishTrade = (_exitPosition, _market) => async (dispatch) => {
  try {
    const currentURL = `v1/trading/position/finish/${_market}`;
    const response = await axios(currentURL, _market);

    if (!response.data[0].mediumPrice) {
      console.log('Saliendo de finishTrade');

      return;
    }
    // const result = calculateResult(response.data[0], _exitPosition);

    const newTrade = {
      // ...response.data[0],
      // onExitPosition,
      finishTime: Date.now(),
      // result,
    };

    const tradeURL = 'v1/trading/trade';
    await axios.post(tradeURL, newTrade);

    dispatch(getTrades());
    dispatch(getPositions());
  } catch (err) {
    console.error(err);
  }
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
