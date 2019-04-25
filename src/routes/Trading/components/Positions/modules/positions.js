// import moment from 'moment';
import axios from '../../../../../config/axios';
import createReducer from '../../../../../redux/create-reducer';
import {
  GET_POSITIONS,
  // GET_TRADES,
  ADD_POSITION,
  EXIT_POSITION,
  GET_POSITION_EQUITY,
  SET_NEW_POSITION,
  SET_SELECTED_MARKET,
} from '../../../../../action-types';
import calculateContracts from '../../../../../utils/trading/calculateContracts';
import calculateMediumPrice from '../../../../../utils/trading/calculateMediumPrice';
import { actions as tradingActions } from '../../../modules/trading';
import { MARKETS } from '../../../modules/constants';
import { getTrades } from '../../Trades/modules/trades';

const onOpenPosition = (market, position) => async (dispatch) => {
  console.log('openPosition');
  dispatch({ type: ADD_POSITION.REQUEST });

  try {
    const URL = `v1/trading/position`;
    const newPosition = {
      enterPrice: position.enterPrice,
      direction: position.direction,
      quantity: position.quantity,
      startDate: Date.now(),
      market,
    };

    const response = await axios.post(URL, newPosition);

    dispatch({ type: ADD_POSITION.SUCCESS });
    dispatch({ type: ADD_POSITION.SET, payload: { [market]: response.data } });
    dispatch(getPositions());
    if (MARKETS.INDICES.includes(market)) {
      dispatch(tradingActions.getIGMarketPrice(market));
    }
    if (MARKETS.CRYPTOS.includes(market)) {
      dispatch(tradingActions.getCoinbasePrice(market));
    }
  } catch (err) {
    dispatch({ type: ADD_POSITION.FAILURE });
    console.error(err);
  }
};

export const getPositions = () => async (dispatch) => {
  dispatch({ type: GET_POSITIONS.REQUEST });

  try {
    const URL = 'v1/trading/positions';
    const response = await axios(URL);

    dispatch({ type: GET_POSITIONS.SUCCESS });
    dispatch({ type: GET_POSITIONS.SET, payload: response.data });
  } catch (err) {
    console.error(err);
    dispatch({ type: GET_POSITIONS.FAILURE });
  }
};

const onExitPosition = (market, position) => async (dispatch, getState) => {
  dispatch({ type: EXIT_POSITION.REQUEST });

  dispatch(deletePosition(market));
  dispatch(finishTrade(position, market));
  // const currentPosition = await getState().trading.positions.open.filter(
  //   (pos) => pos.market === market,
  // );
  // console.log('market', market);
  // console.log('currentPosition', currentPosition);
};

const deletePosition = (market) => async (dispatch) => {
  try {
    const URL = `v1/trading/position/${market}`;
    await axios.delete(URL);

    dispatch({ type: EXIT_POSITION.SUCCESS });
  } catch (err) {
    dispatch({ type: EXIT_POSITION.FAILURE });
  }
};

/**
 * @name finishTrade
 * @description Saves last operation into database
 *
 * @param {*} trade
 */
// Transforma la posición en una operación terminada
const finishTrade = (onExitPosition, market) => async (dispatch) => {
  try {
    const currentURL = `v1/trading/position/balance/${market}`;
    const response = await axios(currentURL, market);

    console.log('finishTrade balance result =>', response.data);

    if (!response.data[0].mediumPrice) {
      return;
    }
    const result = calculateResult(response.data[0], onExitPosition);

    const newTrade = {
      ...response.data[0],
      onExitPosition,
      finishTime: Date.now(),
      result,
    };

    const tradeURL = 'v1/trading/trade';
    await axios.post(tradeURL, newTrade);

    dispatch(getTrades());
    dispatch(getPositions());
  } catch (err) {
    console.error(err);
  }
};

/**
 * @name calculateResult
 * @description Gives the result of the operation in points
 *
 * @param {Object} trade
 * @param {string} trade.enterPrice
 * @param {string} trade.exitPrice
 * @param {string} trade.direction
 *
 * @returns {Number}
 */
function calculateResult(currentPosition, onExitPosition) {
  console.log('currentPosition =>', currentPosition);
  console.log('onExitPosition =>', onExitPosition);
  if (!currentPosition.enterPrice) {
    throw new Error('Missing enterPrice parameter in `calculateResult`');
  }
  if (!onExitPosition.exitPrice) {
    throw new Error('Missing exitPrice parameter in `calculateResult`');
  }
  // TODO Agregar direcction a la respuesta del balance
  if (!currentPosition.direction) {
    throw new Error('Missing direction parameter in `calculateResult`');
  }
  let result;

  if (currentPosition.direction === 'Long') {
    result =
      parseInt(onExitPosition.exitPrice) - parseInt(currentPosition.enterPrice);
  } else {
    result =
      parseInt(currentPosition.enterPrice) - parseInt(onExitPosition.exitPrice);
  }

  return result;
}

export const getCryptoBalance = (crypto, price) => (dispatch, getState) => {
  const positions = getState().trading.positions.open;
  const marketPositions = positions.filter((pos) => pos.market === crypto);

  if (marketPositions.length) {
    let equity = {};
    equity.mediumPrice = calculateMediumPrice(marketPositions);
    equity.openContracts = calculateContracts(marketPositions);
    equity.amount =
      (price.amount - calculateMediumPrice(marketPositions)) *
      equity.openContracts;
    equity.startTrade = marketPositions[0].startDate;

    dispatch({
      type: GET_POSITION_EQUITY.SET,
      payload: { [crypto]: equity },
    });
  }
};

const onSelectMarket = (market) => (dispatch) => {
  dispatch({ type: SET_SELECTED_MARKET.SET, payload: market });
};

const newPosition = (position) => (dispatch) => {
  dispatch({ type: SET_NEW_POSITION.SET, payload: position });
};

export const actions = {
  onOpenPosition,
  getPositions,
  onExitPosition,
  onSelectMarket,
  newPosition,
};

const defaultState = {
  open: [],
  equity: {},
  selectedMarket: '',
  newPosition: {},
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  [ADD_POSITION.SET]: (state, { payload }) => ({
    ...state,
    open: { ...state.open, ...payload },
  }),
  [GET_POSITIONS.SET]: (state, { payload }) => ({
    ...state,
    open: payload,
  }),
  [GET_POSITION_EQUITY.SET]: (state, { payload }) => ({
    ...state,
    equity: {
      ...state.equity,
      ...payload,
    },
  }),
  [SET_SELECTED_MARKET.SET]: (state, { payload }) => ({
    ...state,
    selectedMarket: payload,
  }),
  [SET_NEW_POSITION.SET]: (state, { payload }) => ({
    ...state,
    newPosition: payload,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
