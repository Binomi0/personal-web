// import moment from 'moment';
// import axios from '../../../../../config/axios';
import createReducer from '../../../../../redux/create-reducer';
import { GET_INDEX_BALANCE } from '../../../../../action-types';
import calculateContracts from '../../../../../utils/trading/calculateContracts';
import calculateMediumPrice from '../../../../../utils/trading/calculateMediumPrice';

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
// function calculateResult(currentPosition, onExitPosition) {
//   console.log('currentPosition =>', currentPosition);
//   console.log('onExitPosition =>', onExitPosition);
//   if (!currentPosition.enterPrice) {
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

export const getIndexBalance = (market, price) => async (
  dispatch,
  getState,
) => {
  const currentPositions = getState().trading.positions.open.filter((pos) =>
    ['DOW', 'DAX'].includes(pos.market),
  );

  if (currentPositions) {
    dispatch(getCurrentBalance(market, currentPositions, price));
  }
};

export const getCurrentBalance = (_market, _positions, _livePrice) => (
  dispatch,
) => {
  if (!_livePrice[_market]) {
    return;
  }

  const mediumPrice = calculateMediumPrice(_positions);
  const openContracts = calculateContracts(_positions);

  const equity = {
    mediumPrice,
    openContracts,
    amount: parseInt(
      (_livePrice[_market].OFFER - mediumPrice) * openContracts,
      10,
    ),
    startTrade: _positions[0].startDate,
  };

  dispatch({
    type: GET_INDEX_BALANCE.SET,
    payload: { [_market]: equity },
  });
};

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
      type: GET_INDEX_BALANCE.SET,
      payload: { [crypto]: equity },
    });
  }
};

export const actions = {};

const defaultState = {
  equity: {},
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  [GET_INDEX_BALANCE.SET]: (state, { payload }) => ({
    ...state,
    equity: {
      ...state.equity,
      ...payload,
    },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
