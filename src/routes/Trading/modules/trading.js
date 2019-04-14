import createReducer from '../../../redux/create-reducer';
import axios from '../../../config/axios';

import firebase from '../../../config/firebase';
import { myMarkets } from './constants';

const getEthereumPrice = (price) => async (dispatch) => {
  dispatch({ type: 'GET_COINBASE_PRICE_REQUEST' });

  try {
    axios.defaults.headers['CB-ACCESS-SIGN'] = 'sdkfjaldskghakdlghjkla';
    const response = await axios(
      `https://api.coinbase.com/v2/prices/ETH-EUR/${price}`,
    );

    dispatch({
      type: 'GET_COINBASE_PRICE_SUCESS',
      payload: response.amount,
    });
  } catch (err) {
    dispatch({ type: 'GET_COINBASE_PRICE_FAILURE' });
    console.error(err);
  }
};

const openPosition = (market, position) => async (dispatch) => {
  dispatch({ type: 'TRADING_ADD_POSITION_REQUEST' });

  try {
    // const newPosKey = firebase
    //   .database()
    //   .ref()
    //   .child('market')
    //   .push().key;

    firebase
      .database()
      .ref('/market/' + market + '/position')
      .set({
        enterPrice: position.enterPrice,
        direction: position.direction,
        quantity: position.quantity,
        date: Date.now(),
      });

    const posCountRef = firebase
      .database()
      .ref('market/' + market + '/position');
    posCountRef.on('value', function(position) {
      // ¿Llamar a la Cloud Function 'calculateStatusPosition'?
      dispatch({
        type: 'TRADING_ADD_POSITION_SUCCESS',
        payload: { market, position },
      });
    });
  } catch (err) {
    dispatch({ type: 'TRADING_ADD_POSITION_FAILURE' });
    console.error(err);
  }
};

export const getPositions = () => async (dispatch) => {
  myMarkets.forEach((market) => {
    const markets = firebase.database().ref(`/market/${market}/position`);
    markets.on('value', (snapshot) => {
      console.log('snapshot', snapshot.val());
      dispatch({
        type: 'TRADING_GET_POSITIONS_SUCCESS',
        payload: { [market]: snapshot.val() },
      });
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

export const actions = {
  getEthereumPrice,
  openPosition,
  getPositions,
};

const defaultState = {
  ethereum: {
    buy: '',
  },
  positions: {},
  orders: [],
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  GET_COINBASE_PRICE_REQUEST: (state) => ({ ...state, ...defaultState }),
  GET_COINBASE_PRICE_SUCESS: (state, { payload }) => ({
    ...state,
    ethereum: { buy: payload },
  }),
  TRADING_ADD_POSITION_SUCCESS: (state, { payload }) => ({
    ...state,
    positions: payload,
  }),
  TRADING_GET_POSITIONS_SUCCESS: (state, { payload }) => ({
    ...state,
    positions: { ...state.positions, ...payload },
  }),
  TRADING_GET_POSITION_SUCCESS: (state, { payload }) => ({
    ...state,
    positions: { ...state.positions, ...payload },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
