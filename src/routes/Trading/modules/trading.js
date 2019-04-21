import createReducer from '../../../redux/create-reducer';
import axios from '../../../config/axios';

import {
  GET_COINBASE_PRICE,
  GET_IG_PRICES,
  GET_CHART_DATA,
} from '../../../action-types';
import { MARKETS } from './constants';
import {
  calculateEquity,
  calculateCryptosEquity,
} from '../components/Positions/modules/positions';

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
    dispatch(calculateCryptosEquity(MARKETS[crypto], response.data));
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
  [GET_CHART_DATA.SET]: (state, { payload }) => ({
    ...state,
    charts: {
      ...state.charts,
      ...payload,
    },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
