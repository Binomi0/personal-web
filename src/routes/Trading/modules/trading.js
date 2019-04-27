import createReducer from '../../../redux/create-reducer';
import axios from '../../../config/axios';

import { GET_IG_PRICES, GET_CHART_DATA } from '../../../action-types';
import { MARKETS } from './constants';

const version = '/v1';

/**
 *@name getCoinbasePrice
  @description Get buy price from coinbase

  @return {Number}
 */

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
  [GET_IG_PRICES.SET]: (state, { payload }) => ({
    ...state,
    ig: {
      ...state.ig,
      ...payload,
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
