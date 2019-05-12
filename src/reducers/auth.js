// import axios from '../config/axios';
import createReducer from '../redux/create-reducer';
import { getUser, setUser } from './user';
import { LOG_IN, LOG_OUT, CHECK_USER } from '../action-types';
import firebase from '../config/firebase';

export const checkUser = () => (dispatch) => {
  dispatch({ type: CHECK_USER.REQUEST });
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch({ type: CHECK_USER.SUCCESS });
      dispatch({ type: LOG_IN.SUCCESS });
      dispatch(getUser(user.providerData[0].email));
      dispatch(setUser(user.providerData[0]));
    } else {
      console.log('No tengo usuaior');
      dispatch({ type: CHECK_USER.FAILURE });
      dispatch({ type: LOG_OUT.SET });
      dispatch(setUser({}));
    }
  });
};

const logOut = () => (dispatch) => {
  firebase.auth().signOut();
  dispatch({ type: LOG_OUT.SET });
  dispatch(setUser({}));
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
