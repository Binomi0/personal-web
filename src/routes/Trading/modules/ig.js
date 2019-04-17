import createReducer from '../../../redux/create-reducer';
import axios from '../../../config/axios';

const epicDow = 'IX.D.DOW.IFS.IP';
// const ig = new IG(igAPIKey, isDemo);

const igAuthentication = () => async (dispatch) => {};

const getMarketPrice = (market) => async (dispatch, getState) => {
  dispatch(igAuthentication());

  dispatch({ type: 'TRADING_IG_GET_PRICES_REQUEST' });

  try {
    axios.defaults.baseURL = 'http://localhost:3008';
    if (!market) {
      market = epicDow;
    }
    const URL = `v1/trading/${market}/price`;
    const response = await axios(URL);

    console.log('RESPONSE =>', response);
    dispatch({
      type: 'TRADING_IG_GET_PRICES_SUCCESS',
      payload: { [market]: response.data },
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'TRADING_IG_GET_PRICES_FAILURE' });
  }
};

export const actions = {
  getMarketPrice,
};

const defaultState = {
  prices: {
    market: {},
  },
};

const INITIAL_STATE = { ...defaultState };

const ACTION_HANDLERS = {
  TRADING_IG_GET_PRICES_SUCCESS: (state, { payload }) => ({
    ...state,
    prices: {
      ...state.prices,
      market: {
        ...state.prices.market,
        ...payload,
      },
    },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
