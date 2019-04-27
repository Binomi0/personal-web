// import moment from 'moment';
import axios from '../../../../../config/axios';
import createReducer from '../../../../../redux/create-reducer';
import {
  COINBASE_PRICE,
  IG_LIVESTREAM,
  SET_SPREAD,
} from '../../../../../action-types';
// import calculateContracts from '../../../../../utils/trading/calculateContracts';
// import calculateMediumPrice from '../../../../../utils/trading/calculateMediumPrice';
import LightStreamer from '../../../../../utils/lightStreamClient';
import { getIndexBalance, getCryptoBalance } from './balance';

const lightStreamer = new LightStreamer();
const version = '/v1';

const getCoinbasePrice = (crypto) => async (dispatch) => {
  if (!crypto) {
    throw new Error('No viene crypto');
  }
  dispatch({ type: COINBASE_PRICE.REQUEST });

  try {
    const response = await axios(
      `${version}/trading/prices/coinbase/${crypto}`,
    );

    dispatch({ type: COINBASE_PRICE.SUCCESS });
    dispatch({
      type: COINBASE_PRICE.SET,
      payload: response.data,
    });
    dispatch(getCryptoBalance(crypto, response.data));
  } catch (err) {
    dispatch({ type: COINBASE_PRICE.FAILURE });
    console.error(err);
  }
};
const getIGAuthentication = (callback) => () => {
  lightStreamer.authenticate().then(() => {
    lightStreamer.createConnection();
    callback();
  });
};

const getIGLightStreamer = (market) => (dispatch) => {
  lightStreamer.addSubscription(market, (data) => {
    dispatch({ type: IG_LIVESTREAM.SET, payload: data });
    dispatch(setMarketSpread(market, data));
    dispatch(getIndexBalance(market, data));
  });
};

const setMarketSpread = (market, prices) => (dispatch) => {
  // console.log('prices', prices);
  // console.log('market', market);
  const spread = prices[market].OFFER - prices[market].BID;
  dispatch({
    type: SET_SPREAD.SET,
    payload: { [market]: Number(spread.toFixed(2)) },
  });
};

export const actions = {
  getCoinbasePrice,
  getIGAuthentication,
  getIGLightStreamer,
};

const defaultState = {
  coinbase: {},
  ig: {},
  spread: {},
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  [COINBASE_PRICE.SET]: (state, { payload }) => ({
    ...state,
    coinbase: {
      ...state.coinbase,
      ETH: payload,
    },
  }),

  [IG_LIVESTREAM.SET]: (state, { payload }) => ({
    ...state,
    ig: {
      ...state.ig,
      ...payload,
    },
  }),
  [SET_SPREAD.SET]: (state, { payload }) => ({
    ...state,
    spread: {
      ...state.spread,
      ...payload,
    },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
