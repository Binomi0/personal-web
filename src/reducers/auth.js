import axios from '../config/axios';
import createReducer from '../redux/create-reducer';
import { getUser } from './user';
import { LOG_IN, LOG_OUT } from '../action-types';
import { auth } from 'firebase';

const logIn = (user) => async (dispatch) => {
  console.log('auth', auth);
  console.log('user', user);
  dispatch({ type: LOG_IN.REQUEST });

  try {
    const loggedInUser = getUser();
    if (loggedInUser) {
      return;
    }
    const URL = '/login';
    await axios.post(URL, user);

    dispatch({ type: LOG_IN.SUCCESS });
    dispatch({ type: LOG_IN.SET });
    dispatch(getUser(user.email));
  } catch (err) {
    dispatch({ type: LOG_IN.FAILURE });
  }
};

const logOut = () => (dispatch) => {
  localStorage.removeItem('binoUser');
  dispatch({ type: LOG_OUT.SET });
};

export const actions = {
  logIn,
  logOut,
};

const INITIAL_STATE = {
  authenticated: false,
};

const ACTION_HANDLERS = {
  [LOG_IN.SET]: () => ({
    authenticated: true,
  }),
  [LOG_OUT.SET]: () => ({
    authenticated: false,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
