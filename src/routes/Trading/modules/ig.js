import createReducer from '../../../redux/create-reducer';
import axios from 'axios';
// import moment from 'moment';

const getMarketPrice = (market) => async (dispatch) => {
  dispatch({ type: 'TRADING_IG_GET_PRICES_REQUEST' });

  try {
    const URL = 'https://demo-api.ig.com/gateway/deal/session';
    const body = {
      identifier: 'onrubia',
      password: 'Aoar12003',
    };
    const config = {
      headers: {
        'X-IG-API-KEY': 'b33a31199708bd754979bba54c74aaa7f7315431',
        Version: 2,
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    const response = await axios.post(URL, { ...body }, config);

    console.log('RESPONSE =>', response);
    dispatch({ type: 'TRADING_IG_GET_PRICES_SUCCESS' });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'TRADING_IG_GET_PRICES_FAILURE' });
  }
};

export const actions = {
  getMarketPrice,
};

const defaultState = {
  prices: {
    market: '',
  },
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  GET_COINBASE_PRICE_REQUEST: (state) => ({ ...state, ...defaultState }),
  GET_COINBASE_PRICE_SUCESS: (state, { payload }) => ({
    ...state,
    market: payload,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
