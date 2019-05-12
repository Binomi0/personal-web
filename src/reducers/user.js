import createReducer from '../redux/create-reducer';
import axios from '../config/axios';

import {
  GET_USER,
  SET_USER,
  SET_USER_NAME,
  CREATE_NEW_USER,
  SET_TRAIDING_ACCOUNT_TYPE,
} from '../action-types';

export const setUser = (user) => (dispatch) => {
  if (!user) {
    dispatch({ type: SET_USER.FAILURE });
  }
  dispatch({ type: SET_USER.SET, payload: user });
};

export const getUser = (email) => async (dispatch) => {
  dispatch({ type: GET_USER.REQUEST });

  try {
    const URL = `user/${email}`;
    const response = await axios(URL);

    dispatch({ type: GET_USER.SUCCESS });
    dispatch(setUser(response.data));
  } catch (err) {
    dispatch({ type: GET_USER.FAILURE });
  }
};

const createNewUser = (user) => async (dispatch) => {
  dispatch({ type: CREATE_NEW_USER.REQUEST });

  try {
    const URL = '/user';
    await axios.post(URL, user);

    dispatch({ type: CREATE_NEW_USER.SUCCESS });
    dispatch(getUser(user.email));
  } catch (err) {
    dispatch({ type: CREATE_NEW_USER.FAILURE });
  }
};

const setUserName = (username) => (dispatch) => {
  dispatch({ type: SET_USER_NAME.SET, payload: username });
};

const setTraidingAccountType = (tradingAccountType) => (dispatch) => {
  dispatch({
    type: SET_TRAIDING_ACCOUNT_TYPE.SET,
    payload: tradingAccountType,
  });
};

export const actions = {
  getUser,
  setUser,
  setTraidingAccountType,
  setUserName,
  createNewUser,
};

const INITIAL_STATE = {
  accountType: '',
  email: '',
  password: '',
  positions: [],
  role: '',
  trades: [],
  username: '',
};

const ACTION_HANDLER = {
  [SET_USER.SET]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_USER.FAILURE]: () => ({}),
  [SET_TRAIDING_ACCOUNT_TYPE.SET]: (state, { payload }) => ({
    ...state,
    tradingAccountType: payload,
  }),
  [SET_USER_NAME.SET]: (state, { payload }) => ({
    ...state,
    username: payload,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLER);
