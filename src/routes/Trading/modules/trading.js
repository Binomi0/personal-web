import createReducer from '../../../redux/create-reducer';
import axios from '../../../config/axios';

import { GET_COINBASE_PRICE, GET_IG_PRICES } from '../../../action-types';
import { MARKETS } from './constants';
import { calculateEquity } from '../components/Positions/modules/positions';

const version = '/v1';

/**
 *@name getCoinbasePrice
  @description Get buy price from coinbase

  @return {Number}
 */
const getCoinbasePrice = (crypto) => async (dispatch) => {
  if (!crypto) {
    throw new Error('No viene crypto');
  }
  dispatch({ type: GET_COINBASE_PRICE.REQUEST });

  try {
    const response = await axios(
      `${version}/trading/prices/coinbase/${crypto}`,
    );

    dispatch({ type: GET_COINBASE_PRICE.SUCCESS });
    dispatch({
      type: GET_COINBASE_PRICE.SET,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: GET_COINBASE_PRICE.FAILURE });
    console.error(err);
  }
};

const getIGMarketPrice = (market) => async (dispatch) => {
  if (!market) {
    throw new Error('No recibo market');
  }
  dispatch({ type: GET_IG_PRICES.REQUEST });

  try {
    const URL = `${version}/trading/prices/ig/${MARKETS[market]}`;
    const response = await axios(URL);

    dispatch({ type: GET_IG_PRICES.SUCCESS });
    dispatch({
      type: GET_IG_PRICES.SET,
      payload: { [market]: response.data },
    });
    dispatch(calculateEquity(market, response.data));
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_IG_PRICES.FAILURE });
  }
};

export const actions = {
  getCoinbasePrice,
  getIGMarketPrice,
};

const defaultState = {
  coinbase: {
    ETH: {},
  },
  ig: {
    DAX: {},
    DOW: {},
  },
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  [GET_IG_PRICES.SET]: (state, { payload }) => {
    return {
      ...state,
      ig: {
        ...state.ig,
        ...payload,
      },
    };
  },
  [GET_COINBASE_PRICE.SET]: (state, { payload }) => ({
    ...state,
    coinbase: {
      ...state.coinbase,
      ETH: payload,
    },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
