import createReducer from '../../../redux/create-reducer';
import axios from '../../../config/axios';
import moment from 'moment';

import firebase from '../../../config/firebase';

const getEthereumPrice = (price) => async (dispatch) => {
  dispatch({ type: 'GET_COINBASE_PRICE_REQUEST' });

  try {
    axios.defaults.headers['CB-ACCESS-SIGN'] = 'sdkfjaldskghakdlghjkla';
    const response = await axios(
      `https://api.coinbase.com/v2/prices/ETH-EUR/${price}`,
    );

    dispatch({
      type: 'GET_COINBASE_PRICE_SUCESS',
      payload: response.data.data.amount,
    });
  } catch (err) {
    dispatch({ type: 'GET_COINBASE_PRICE_FAILURE' });
    console.error(err);
  }
};

const openPosition = (market, position) => async (dispatch) => {
  dispatch({ type: 'TRADING_ADD_POSITION_REQUEST' });

  try {
    const ref = `/market/${market}/position`;
    const newPosition = {
      enterPrice: position.enterPrice,
      direction: position.direction,
      quantity: position.quantity,
      date: Date.now(),
    };

    firebase
      .database()
      .ref(ref)
      .set(newPosition);

    getPositions();
  } catch (err) {
    dispatch({ type: 'TRADING_ADD_POSITION_FAILURE' });
    console.error(err);
  }
};

export const getPositions = () => async (dispatch) => {
  const DAX = firebase.database().ref('/market/DAX/position');
  const US30 = firebase.database().ref('/market/US30/position');

  DAX.on('value', (snapshot) => {
    dispatch({
      type: 'TRADING_GET_POSITIONS_SUCCESS',
      payload: { DAX: snapshot.val() },
    });
  });

  US30.on('value', (snapshot) => {
    dispatch({
      type: 'TRADING_GET_POSITIONS_SUCCESS',
      payload: { US30: snapshot.val() },
    });
  });
};

// export const getPosition = (market) => async (dispatch) => {
//   if (market) {
//     const markets = firebase.database().ref('/market/' + market + '/position');
//     markets.on('child_added', (snapshot) => {
//       dispatch({
//         type: 'TRADING_GET_POSITION_SUCCESS',
//         payload: { [market]: snapshot.val() },
//       });
//     });
//   }
// };

const exitPosition = (market, exitPosition) => async (dispatch, getState) => {
  dispatch({ type: 'TRADING_EXIT_POSITION_REQUEST' });

  const enterPosition = await getState().trading.positions[market];

  try {
    await firebase
      .database()
      .ref(`/market/${market}/position`)
      .remove();

    dispatch(finishTrade(market, enterPosition, exitPosition));

    const positions = delete getState().trading.positions[market];

    dispatch({ type: 'TRADING_EXIT_POSITION_SUCCESS', payload: positions });
  } catch (err) {
    dispatch({ type: 'TRADING_EXIT_POSITION_FAILURE' });
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
  const DAX = firebase.database().ref('/market/DAX/trades');
  const US30 = firebase.database().ref('/market/US30/trades');

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
      type: 'TRADING_GET_TRADES_SUCCESS',
      payload: { DAX: daxTrades },
    });
    dispatch({
      type: 'TRADING_CALCULATE_EQUITY_SUCCESS',
      payload: operations,
    });
  });

  US30.on('child_added', (snapshot) => {
    result += snapshot.val().result;
    operations.push(result);
    us30Trades.push(parseTrades(snapshot.val()));
    dispatch({
      type: 'TRADING_GET_TRADES_SUCCESS',
      payload: { US30: us30Trades },
    });
    dispatch({
      type: 'TRADING_CALCULATE_EQUITY_SUCCESS',
      payload: operations,
    });
  });
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
    throw new Error('No se recibe enterPrice');
  }
  if (!exitPrice) {
    throw new Error('No se recibe exitPrice');
  }
  if (!direction) {
    throw new Error('No se recibe direction');
  }
  let result;
  console.log('direction =>', direction);

  if (direction === 'Long') {
    result = parseInt(exitPrice) - parseInt(enterPrice);
  } else {
    console.log(enterPrice);
    console.log(exitPrice);
    result = parseInt(enterPrice) - parseInt(exitPrice);
  }
  console.log('result =>', result);

  return result;
}

export const actions = {
  getEthereumPrice,
  openPosition,
  getPositions,
  exitPosition,
  getTrades,
};

const defaultState = {
  ethereum: {
    buy: '',
  },
  positions: {},
  orders: [],
  trades: {
    DAX: [],
    US30: [],
  },
  equity: [],
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  GET_COINBASE_PRICE_SUCESS: (state, { payload }) => ({
    ...state,
    ethereum: { buy: payload },
  }),
  TRADING_ADD_POSITION_SUCCESS: (state, { payload }) => ({
    ...state,
    positions: payload,
  }),
  TRADING_GET_TRADES_SUCCESS: (state, { payload }) => ({
    ...state,
    trades: { ...state.trades, ...payload },
  }),
  TRADING_GET_POSITIONS_SUCCESS: (state, { payload }) => ({
    ...state,
    positions: { ...state.positions, ...payload },
  }),
  TRADING_GET_POSITION_SUCCESS: (state, { payload }) => ({
    ...state,
    positions: { ...state.positions, ...payload },
  }),
  TRADING_CALCULATE_EQUITY_SUCCESS: (state, { payload }) => ({
    ...state,
    equity: [...payload],
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
