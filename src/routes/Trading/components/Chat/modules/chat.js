import io from 'socket.io-client';

import createReducer from '../../../../../redux/create-reducer';
import {
  INIT_CHAT_SOCKET,
  NEW_CHAT_MESSAGE,
} from '../../../../../action-types';

let socket;
let host = process.env.REACT_APP_SOCKET_HOST;
if (process.env.NODE_ENV === 'production') {
  host = process.env.REACT_APP_API_URL;
}

const initChatSocket = () => (dispatch) => {
  dispatch({ type: INIT_CHAT_SOCKET.REQUEST });
  try {
    socket = io.connect(host, { forceNew: true });

    socket.on('new-message', (message) => {
      dispatch(newMessage(message));
    });

    socket.on('messages', (messages) => {
      dispatch({ type: INIT_CHAT_SOCKET.SET, payload: messages });
    });

    dispatch({ type: INIT_CHAT_SOCKET.SUCCESS });
  } catch (err) {
    console.error(err);
    dispatch({ type: INIT_CHAT_SOCKET.FAILURE });
  }
};

const newMessage = ({ text, user }) => (dispatch) => {
  dispatch({
    type: NEW_CHAT_MESSAGE.SET,
    payload: { text, author: user },
  });

  socket.emit('new-message', { text, author: user._id });
};

export const actions = {
  initChatSocket,
  newMessage,
};

export const INITIAL_STATE = {
  messages: [],
};

export const ACTION_HANDLERS = {
  [INIT_CHAT_SOCKET.SET]: (state, { payload }) => ({
    ...state,
    messages: payload,
  }),
  [NEW_CHAT_MESSAGE.SET]: (state, { payload }) => ({
    ...state,
    messages: [payload, ...state.messages],
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
