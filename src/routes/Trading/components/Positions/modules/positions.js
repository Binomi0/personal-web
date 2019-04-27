// import moment from 'moment';
import axios from '../../../../../config/axios';
import createReducer from '../../../../../redux/create-reducer';
import {
  GET_POSITIONS,
  ADD_POSITION,
  EXIT_POSITION,
  GET_POSITION_EQUITY,
  SET_NEW_POSITION,
  SET_SELECTED_MARKET,
} from '../../../../../action-types';
import { finishTrade } from '../../Trades/modules/trades';
import { getCurrentBalance } from './balance';

const version = 'v1';

const onOpenPosition = (market, position) => async (dispatch) => {
  dispatch({ type: ADD_POSITION.REQUEST });

  try {
    const URL = `${version}/trading/position`;
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
    dispatch(getPositions(market));
  } catch (err) {
    dispatch({ type: ADD_POSITION.FAILURE });
    console.error(err);
  }
};

export const getPositions = (market) => async (dispatch) => {
  dispatch({ type: GET_POSITIONS.REQUEST });

  try {
    const URL = 'v1/trading/positions';
    const response = await axios(URL);

    dispatch({ type: GET_POSITIONS.SUCCESS });
    dispatch({ type: GET_POSITIONS.SET, payload: response.data });
    dispatch(getCurrentBalance(market, response.data));
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

const deletePosition = (market) => async (dispatch, getState) => {
  try {
    const URL = `v1/trading/position/${market}`;
    await axios.delete(URL);

    const positions = getState().trading.positions.open.filter(
      (pos) => pos.market !== market,
    );

    dispatch({ type: EXIT_POSITION.SUCCESS });
    dispatch({ type: EXIT_POSITION.SET, payload: positions });
  } catch (err) {
    dispatch({ type: EXIT_POSITION.FAILURE });
  }
};

// /**
//  * @name calculateResult
//  * @description Gives the result of the operation in points
//  *
//  * @param {Object} trade
//  * @param {string} trade.enterPrice
//  * @param {string} trade.exitPrice
//  * @param {string} trade.direction
//  *
//  * @returns {Number}
//  */
// function calculateResult(currentPosition, onExitPosition) {
//   console.log('currentPosition =>', currentPosition);
//   console.log('onExitPosition =>', onExitPosition);
//   if (!currentPosition.mediumPrice) {
//     throw new Error('Missing enterPrice parameter in `calculateResult`');
//   }
//   if (!onExitPosition.exitPrice) {
//     throw new Error('Missing exitPrice parameter in `calculateResult`');
//   }
//   // TODO Agregar direcction a la respuesta del balance
//   if (!currentPosition.direction) {
//     throw new Error('Missing direction parameter in `calculateResult`');
//   }
//   let result;

//   if (currentPosition.direction === 'Long') {
//     result =
//       parseInt(onExitPosition.exitPrice) - parseInt(currentPosition.enterPrice);
//   } else {
//     result =
//       parseInt(currentPosition.enterPrice) - parseInt(onExitPosition.exitPrice);
//   }

//   return result;
// }

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

const INITIAL_STATE = {
  open: [],
  equity: {},
  selectedMarket: '',
  newPosition: {},
};

const ACTION_HANDLERS = {
  [ADD_POSITION.SET]: (state, { payload }) => ({
    ...state,
    open: [...state.open, payload],
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
  [EXIT_POSITION.SET]: (state, { payload }) => ({
    ...state,
    open: payload,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
