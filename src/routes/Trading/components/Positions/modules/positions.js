// import moment from 'moment';
import ReactGA from 'react-ga';

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
    ReactGA.event({
      category: 'Trading',
      action: `Open a new position ${market}`,
      value: 1,
      label: `${position.direction === 'Long' ? 'Buy' : 'Sell'} ${
        position.quantity
      } contracts at ${position.enterPrice}`,
    });
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
    try {
      const URL = `${version}/trading/position/exit/${market}`;
      await axios.post(URL, position);

      dispatch({ type: EXIT_POSITION.SUCCESS });
      dispatch(getPositions());

      ReactGA.event({
        category: 'Trading',
        action: `Close a position on ${market}`,
        value: 1,
        label: `Closed ${position.quantity} contracts at ${position.exitPrice}`,
      });
    } catch (err) {
      console.error('err', err);
      dispatch({ type: EXIT_POSITION.FAILURE });
    }
  } else {
    dispatch(deletePosition(market));
    dispatch(finishTrade(currentPosition, position, market));
    ReactGA.event({
      category: 'Trading',
      action: `Close a position on ${market}`,
      value: 1,
      label: `Closed ${position.quantity} contracts at ${position.exitPrice}`,
    });
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
