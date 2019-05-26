import createReducer from '../redux/create-reducer';
import { LOG_IN, LOG_OUT, CHECK_USER } from '../action-types';
import firebase from '../config/firebase';
import { getUser, setUser, deleteUser } from './user';

export const checkUser = () => (dispatch) => {
  dispatch({ type: CHECK_USER.REQUEST });
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch({ type: CHECK_USER.SUCCESS });
      dispatch({ type: LOG_IN.SUCCESS });
      dispatch(getUser(user.providerData[0]));
    } else {
      dispatch({ type: CHECK_USER.FAILURE });
      dispatch(logOut());
    }
  });
};

const logOut = () => (dispatch) => {
  firebase.auth().signOut();
  localStorage.clear();
  dispatch({ type: LOG_OUT.SET });
  dispatch(setUser({}));
  dispatch(deleteUser());
};

export const actions = {
  logOut,
  checkUser,
};

const INITIAL_STATE = {
  authenticated: false,
};

const ACTION_HANDLERS = {
  [LOG_IN.SUCCESS]: () => ({
    authenticated: true,
  }),
  [LOG_OUT.SET]: () => ({
    authenticated: false,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
