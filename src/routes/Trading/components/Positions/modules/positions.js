import moment from 'moment';
import axios from '../../../../../config/axios';

import createReducer from '../../../../../redux/create-reducer';
// import axios from '../../../../../config/axios';
import firebase from '../../../../../config/firebase';
import {
  GET_POSITIONS,
  GET_TRADES,
  CALCULATE_EQUITY,
  ADD_POSITION,
  EXIT_POSITION,
  GET_POSITION_EQUITY,
} from '../../../../../action-types';
import calculateContracts from '../../../../../utils/trading/calculateContracts';
import calculateMediumPrice from '../../../../../utils/trading/calculateMediumPrice';
import { actions as tradingActions } from '../../../modules/trading';

const openPosition = (market, position) => async (dispatch) => {
  dispatch({ type: ADD_POSITION.REQUEST });

  try {
    const URL = `v1/trading/position`;
    const newPosition = {
      enterPrice: position.enterPrice,
      direction: position.direction,
      quantity: position.quantity,
      date: Date.now(),
      market,
    };

    const response = await axios.post(URL, newPosition);

    dispatch({ type: ADD_POSITION.SUCCESS });
    dispatch({ type: ADD_POSITION.SET, payload: { [market]: response.data } });
    dispatch(getPositions());
    dispatch(tradingActions.getIGMarketPrice(market));
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

const exitPosition = (market, exitPosition) => async (dispatch, getState) => {
  dispatch({ type: EXIT_POSITION.REQUEST });

  const enterPosition = await getState().trading.positions[market];

  try {
    await firebase
      .database()
      .ref(`/market/${market}/position`)
      .remove();

    dispatch(finishTrade(market, enterPosition, exitPosition));

    const positions = delete getState().trading.positions[market];

    dispatch({ type: EXIT_POSITION.SUCCESS });
    dispatch({ type: EXIT_POSITION.SET, payload: positions });
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
const finishTrade = (market, position, exitPosition) => async (dispatch) => {
  const result = calculateResult(
    position.enterPrice,
    exitPosition.exitPrice,
    position.direction,
  );
  const newPosKey = firebase
    .database()
    .ref()
    .child('market')
    .push().key;

  const newTrade = {
    ...position,
    exitPosition,
    finishTime: Date.now(),
    result,
  };

  // Transforma la posición en una operación terminada
  try {
    const ref = `market/${market}/trades/${newPosKey}`;

    await firebase
      .database()
      .ref(ref)
      .set(newTrade);

    dispatch(getTrades());
  } catch (err) {
    console.error(err);
  }
};

const getTrades = () => (dispatch) => {
  dispatch({ type: GET_TRADES.REQUEST });

  const DAX = firebase.database().ref('/market/DAX/trades');
  const DOW = firebase.database().ref('/market/DOW/trades');

  const daxTrades = [];
  const us30Trades = [];
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

  DAX.on('child_added', (snapshot) => {
    result += snapshot.val().result;
    operations.push(result);
    daxTrades.push(parseTrades(snapshot.val()));
    dispatch({
      type: GET_TRADES.SET,
      payload: { DAX: daxTrades },
    });
    dispatch({
      type: CALCULATE_EQUITY.SET,
      payload: operations,
    });
  });

  DOW.on('child_added', (snapshot) => {
    result += snapshot.val().result;
    operations.push(result);
    us30Trades.push(parseTrades(snapshot.val()));
    dispatch({
      type: GET_TRADES.SET,
      payload: { DOW: us30Trades },
    });
    dispatch({
      type: CALCULATE_EQUITY.SET,
      payload: operations,
    });
  });

  dispatch({ type: GET_TRADES.SUCCESS });
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
function calculateResult(enterPrice, exitPrice, direction) {
  if (!enterPrice) {
    throw new Error('Missing enterPrice parameter in `calculateResult`');
  }
  if (!exitPrice) {
    throw new Error('Missing exitPrice parameter in `calculateResult`');
  }
  if (!direction) {
    throw new Error('Missing direction parameter in `calculateResult`');
  }
  let result;

  if (direction === 'Long') {
    result = parseInt(exitPrice) - parseInt(enterPrice);
  } else {
    result = parseInt(enterPrice) - parseInt(exitPrice);
  }

  return result;
}

export const calculateEquity = (market, price) => (dispatch, getState) => {
  const positions = getState().trading.positions.open;
  const marketPositions = positions.filter((pos) => pos.market === market);

  // console.log(market);
  // console.log(marketPositions);
  if (marketPositions.length) {
    console.log(calculateMediumPrice(marketPositions));
    let equity = {};
    const direction = marketPositions[0].direction === 'Long' ? 'bid' : 'offer';
    equity.mediumPrice = calculateMediumPrice(marketPositions);
    equity.openContracts = calculateContracts(marketPositions);
    equity.amount =
      (price[direction] - calculateMediumPrice(marketPositions)) *
      equity.openContracts;
    equity.startTrade = positions[0].startDate;

    dispatch({
      type: GET_POSITION_EQUITY.SET,
      payload: { [market]: equity },
    });
  }
};

export const actions = {
  openPosition,
  getPositions,
  exitPosition,
  getTrades,
};

const defaultState = {
  open: [],
  equity: {},
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  [ADD_POSITION.SET]: (state, { payload }) => ({
    ...state,
    open: { ...state.open, ...payload },
  }),
  [GET_TRADES.SET]: (state, { payload }) => ({
    ...state,
    trades: { ...state.trades, ...payload },
  }),
  [GET_POSITIONS.SET]: (state, { payload }) => ({
    ...state,
    open: payload,
  }),
  [CALCULATE_EQUITY.SET]: (state, { payload }) => ({
    ...state,
    equity: [...payload],
  }),
  [GET_POSITION_EQUITY.SET]: (state, { payload }) => ({
    ...state,
    equity: {
      ...state.equity,
      ...payload,
    },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
