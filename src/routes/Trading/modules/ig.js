import createReducer from '../../../redux/create-reducer';
import axios from 'axios';
// import IG from 'ig-api';
// import moment from 'moment';
const igAPIKey = process.env.REACT_APP_IG_API_KEY;
// const isDemo = process.env.REACT_APP_IG_ISDEMO;
const identifier = process.env.REACT_APP_IG_USERNAME;
const password = process.env.REACT_APP_IG_PASSWORD;

// const ig = new IG(igAPIKey, isDemo);

const getMarketPrice = (market) => async (dispatch) => {
  dispatch({ type: 'TRADING_IG_GET_PRICES_REQUEST' });

  try {
    const URL = 'https://demo-api.ig.com/gateway/deal/session';
    const body = { identifier, password };
    const config = {
      headers: {
        'X-IG-API-KEY': igAPIKey,
        Version: 2,
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    // await ig.login(identifier, password, true);
    // const prices = await ig.get('prices/IX.D.DAX.IFD.IP/MINUTE_2/10000', 2);
    // const watchlist = await ig.get('watchlist', 1, {
    //   watchlistId: '4310913',
    // });
    const response = await axios.post(URL, body, config);

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
