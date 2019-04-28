import createReducer from '../redux/create-reducer';

import { OPEN_MODAL, CLOSE_MODAL } from '../action-types';

const openModal = (modalType) => (dispatch) => {
  // console.log('modalType =>', modalType);
  dispatch({ type: OPEN_MODAL.SET, payload: modalType });
};
const closeModal = () => (dispatch) => {
  dispatch({ type: CLOSE_MODAL.SET });
};

export const actions = {
  openModal,
  closeModal,
};

const INITIAL_STATE = {
  type: '',
  open: false,
};

const ACTION_HANDLER = {
  [OPEN_MODAL.SET]: (state, { payload }) => ({
    ...state,
    type: payload,
    open: true,
  }),
  [CLOSE_MODAL.SET]: (state) => ({
    ...state,
    type: '',
    open: false,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLER);
