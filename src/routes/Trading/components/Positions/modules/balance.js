import createReducer from '../../../../../redux/create-reducer';
import {
  GET_INDEX_BALANCE,
  GET_CRYPTO_BALANCE,
} from '../../../../../action-types';
import calculateContracts from '../../../../../utils/trading/calculateContracts';
import calculateMediumPrice from '../../../../../utils/trading/calculateMediumPrice';

const MARKETS = {
  'IX.D.DOW.IFS.IP': 'DOW',
  'IX.D.DAX.IFS.IP': 'DAX',
};

export const getIndexBalance = (market, price) => async (
  dispatch,
  getState,
) => {
  const currentPositions = getState().trading.positions.open.filter(
    (pos) => pos.market === MARKETS[market],
  );

  if (currentPositions) {
    dispatch(getCurrentBalance(market, currentPositions, price));
  }
};

export const getCurrentBalance = (_market, _positions, _livePrice) => (
  dispatch,
  getState,
) => {
  if (!_livePrice) {
    _livePrice = getState().trading.prices.ig;
  }
  if (!_livePrice[_market]) {
    return;
  }
  if (!_positions.length) {
    dispatch({ type: GET_INDEX_BALANCE.SET, payload: { [_market]: {} } });
    return;
  }

  const { OFFER, BID } = _livePrice[_market];
  const mediumPrice = calculateMediumPrice(_positions);
  const quantity = calculateContracts(_positions);
  const isLong = _positions[0].direction === 'Long';
  let amount = 0;
  if (isLong) {
    amount = (BID - mediumPrice) * quantity;
  } else {
    amount = (mediumPrice - OFFER) * quantity;
  }

  const equity = {
    mediumPrice: Number(mediumPrice.toFixed(2)),
    quantity: Number(quantity.toFixed(0)),
    amount: Number(amount.toFixed(2)),
    startTrade: _positions[0].startDate,
    direction: _positions[0].direction,
  };

  dispatch({
    type: GET_INDEX_BALANCE.SET,
    payload: { [_market]: equity },
  });
};

export const updateBalance = () => (dispatch, getState) => {
  const { selectedMarket } = getState().trading.positions;
  const { equity } = getState().trading.balance;

  const itemName = Object.keys(equity).filter((pos) =>
    pos.includes(selectedMarket),
  );
  delete equity[itemName];

  dispatch({ type: GET_INDEX_BALANCE.SET, payload: equity });
};

export const getCryptoBalance = (crypto, price) => (dispatch, getState) => {
  const positions = getState().trading.positions.open;
  const marketPositions = positions.filter((pos) => pos.market === crypto);

  if (marketPositions.length) {
    let equity = {};
    equity.mediumPrice = calculateMediumPrice(marketPositions);
    equity.quantity = calculateContracts(marketPositions);
    equity.amount = (price.amount - equity.mediumPrice) * equity.quantity;
    equity.startTrade = marketPositions[0].startDate;
    equity.direction = marketPositions[0].direction;

    dispatch({
      type: GET_CRYPTO_BALANCE.SET,
      payload: { [crypto]: equity },
    });
  }
};

export const actions = {
  getCryptoBalance,
  getCurrentBalance,
  getIndexBalance,
};

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
  [GET_CRYPTO_BALANCE.SET]: (state, { payload }) => ({
    ...state,
    equity: {
      ...state.equity,
      ...payload,
    },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
