import createReducer from '../../../redux/create-reducer';
import axios from '../../../config/axios';

import {
  GET_COINBASE_PRICE,
  GET_IG_PRICES,
  GET_CHART_DATA,
  SET_NEW_PRICE,
} from '../../../action-types';
import { MARKETS } from './constants';
import {
  getIndexBalance,
  getCryptoBalance,
} from '../components/BalanceCards/modules/balanceCards';
import LightStreamer from '../../../utils/lightStreamClient';

const lightStreamer = new LightStreamer();
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
    dispatch(getCryptoBalance(MARKETS[crypto], response.data));
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
    dispatch(getIndexBalance(market, response.data));
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_IG_PRICES.FAILURE });
  }
};

const getIGAuthentication = (callback) => () => {
  lightStreamer.authenticate().then(() => {
    lightStreamer.createConnection();
    callback();
  });
};

const getIGLightStreamer = (market) => (dispatch) => {
  console.log('market', market);
  lightStreamer.addSubscription(market, (data) => {
    dispatch({ type: SET_NEW_PRICE.SET, payload: data });
    dispatch(getIndexBalance(market, data));
  });
};

const getChartData = (market, bars) => async (dispatch) => {
  dispatch({ type: GET_CHART_DATA.REQUEST });
  try {
    const URL = `${version}/trading/prices/chart/${MARKETS[market]}/${bars}`;
    const response = await axios(URL);

    const DAX = market.includes('DAX') && 'DAX';
    const DOW = market.includes('DOW') && 'DOW';

    const chartData = [];
    response.data.forEach((tickData) => {
      const chartItems = {};
      chartItems.x = tickData.snapshotTime;
      chartItems.open = tickData.openPrice.bid;
      chartItems.close = tickData.closePrice.bid;
      chartItems.high = tickData.highPrice.bid;
      chartItems.low = tickData.lowPrice.bid;
      chartData.push(chartItems);
    });

    console.log('chartData =>', chartData);

    dispatch({ type: GET_CHART_DATA.SUCCESS });
    dispatch({
      type: GET_CHART_DATA.SET,
      payload: { [DAX || DOW]: chartData },
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_CHART_DATA.FAILURE });
  }
};

export const actions = {
  getCoinbasePrice,
  getIGMarketPrice,
  getChartData,
  getIGLightStreamer,
  getIGAuthentication,
};

const defaultState = {
  coinbase: {
    ETH: {},
  },
  ig: {
    DAX: {},
    DOW: {},
  },
  charts: {},
  liveStream: {},
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  [GET_IG_PRICES.SET]: (state, { payload }) => ({
    ...state,
    ig: {
      ...state.ig,
      ...payload,
    },
  }),
  [GET_COINBASE_PRICE.SET]: (state, { payload }) => ({
    ...state,
    coinbase: {
      ...state.coinbase,
      ETH: payload,
    },
  }),
  [GET_CHART_DATA.SET]: (state, { payload }) => ({
    ...state,
    charts: {
      ...state.charts,
      ...payload,
    },
  }),
  [SET_NEW_PRICE.SET]: (state, { payload }) => ({
    ...state,
    liveStream: {
      ...state.liveStream,
      ...payload,
    },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
