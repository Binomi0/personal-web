import createReducer from '../redux/create-reducer';
import { OPEN_DRAWER, CLOSE_DRAWER } from '../action-types';

const openDrawer = (drawerType) => (dispatch) => {
  console.log('drawerType =>', drawerType);
  dispatch({ type: OPEN_DRAWER.SET, payload: drawerType });
};

const closeDrawer = () => (dispatch) => {
  dispatch({ type: CLOSE_DRAWER.SET });
};

export const actions = {
  openDrawer,
  closeDrawer,
};

const INITIAL_STATE = {
  type: '',
  open: false,
};

const ACTION_HANDLER = {
  [OPEN_DRAWER.SET]: (state, { payload }) => ({
    ...state,
    type: payload,
    open: true,
  }),
  [CLOSE_DRAWER.SET]: (state) => ({
    ...state,
    type: '',
    open: false,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLER);
