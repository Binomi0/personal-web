import createReducer from '../../../redux/create-reducer';
import axios from '../../../config/axios';

const getEthereumPrice = (price) => async (dispatch) => {
  try {
    axios.defaults.headers['CB-ACCESS-SIGN'] = 'sdkfjaldskghakdlghjkla';
    const response = await axios(
      `https://api.coinbase.com/v2/prices/ETH-EUR/${price}`,
    );

    dispatch({ type: 'GET_COINBASE_PRICE_REQUEST' });
    dispatch({
      type: 'GET_COINBASE_PRICE_SUCESS',
      payload: response.amount,
    });
    dispatch({ type: 'GET_COINBASE_PRICE_FAILURE' });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

export const actions = {
  getEthereumPrice,
};

const INITIAL_STATE = {
  ethereum: {
    buy: '',
  },
};

const ACTION_HANDLERS = {
  GET_COINBASE_PRICE_SUCESS: (state, { payload }) => ({
    ...state,
    ethereum: { buy: payload },
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
