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
  DELETE_POSITION,
} from '../../../../../action-types';
import { finishTrade } from '../../Trades/modules/trades';
import { getCurrentBalance } from './balance';
import { MARKETS } from '../../../modules/constants';

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

    await axios.post(URL, newPosition);

    dispatch({ type: ADD_POSITION.SUCCESS });
    dispatch(getPositions(market));
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

    // console.log('getPositions => response.data', response.data);
    dispatch({ type: GET_POSITIONS.SUCCESS });
    dispatch({ type: GET_POSITIONS.SET, payload: response.data });

    const daxPositions = [];
    const dowPositions = [];
    response.data.forEach((position) => {
      if (position.market === MARKETS.DOW) {
        dowPositions.push(position);
      }
      if (position.market === MARKETS.DAX) {
        daxPositions.push(position);
      }
    });
    dispatch(getCurrentBalance(MARKETS.IG.DOW, dowPositions));
    dispatch(getCurrentBalance(MARKETS.IG.DAX, daxPositions));
  } catch (err) {
    console.error(err);
    dispatch({ type: GET_POSITIONS.FAILURE });
  }
};

const onExitPosition = (market, position) => async (dispatch, getState) => {
  dispatch({ type: EXIT_POSITION.REQUEST });

  const currentPosition = getState().trading.balance.equity[MARKETS.IG[market]];

  if (position.quantity !== currentPosition.quantity) {
    const currentTotal =
      position.direction === 'Long'
        ? position.exitPrice - currentPosition.mediumPrice
        : currentPosition.mediumPrice - position.exitPrice;

    try {
      const URL = `${version}/trading/position/exit/${market}`;
      await axios.post(URL, position);

      dispatch({ type: EXIT_POSITION.SUCCESS });
      dispatch(getPositions());
    } catch (err) {
      console.error('err', err);
      dispatch({ type: EXIT_POSITION.FAILURE });
    }
  } else {
    dispatch(deletePosition(market));
    dispatch(finishTrade(position, market));
  }
  // const currentPosition = await getState().trading.positions.open.filter(
  //   (pos) => pos.market === market,
  // );
  // console.log('market', market);
  // console.log('currentPosition', currentPosition);
};

const deletePosition = (market) => async (dispatch, getState) => {
  dispatch({ type: DELETE_POSITION.REQUEST });
  try {
    const URL = `v1/trading/position/${market}`;
    await axios.delete(URL);

    const positions = getState().trading.positions.open.filter(
      (pos) => pos.market !== market,
    );

    dispatch({ type: DELETE_POSITION.SUCCESS });
    dispatch({ type: EXIT_POSITION.SET, payload: positions });
    dispatch(getPositions());
  } catch (err) {
    dispatch({ type: DELETE_POSITION.FAILURE });
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
  livePosition: {},
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
