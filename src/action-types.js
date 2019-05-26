function requestAction(action) {
  return {
    REQUEST: `${action}_REQUEST`,
    SET: `${action}_SET`,
    SUCCESS: `${action}_SUCCESS`,
    FAILURE: `${action}_FAILURE`,
  };
}

export const GET_IG_PRICES = requestAction('/trading/GET_IG_PRICE');
export const COINBASE_PRICE = requestAction('/trading/COINBASE_PRICE');
export const GET_POSITIONS = requestAction('/trading/GET_POSITIONS');
export const GET_TRADES = requestAction('/trading/GET_TRADES');
export const CALCULATE_EQUITY = requestAction('/trading/CALCULATE_EQUITY');
export const GET_INDEX_BALANCE = requestAction('/trading/GET_INDEX_BALANCE');
export const GET_CRYPTO_BALANCE = requestAction('/trading/GET_CRYPTO_BALANCE');
export const GET_CURRENT_BALANCE = requestAction(
  '/trading/GET_CURRENT_BALANCE',
);
export const ADD_POSITION = requestAction('/trading/ADD_POSITION');
export const EXIT_POSITION = requestAction('/trading/EXIT_POSITION');
export const GET_CHART_DATA = requestAction('/trading/GET_CHART_DATA');
export const GET_POSITION_EQUITY = requestAction(
  '/trading/GET_POSITION_EQUITY',
);

// MODALS
export const OPEN_MODAL = requestAction('/modals/OPEN_MODAL');
export const CLOSE_MODAL = requestAction('/modals/CLOSE_MODAL');
export const OPEN_DRAWER = requestAction('/modals/OPEN_DRAWER');
export const CLOSE_DRAWER = requestAction('/modals/CLOSE_DRAWER');

// TRADING
export const IG_LIVESTREAM = requestAction('/trading/IG_LIVESTREAM');
export const SET_SELECTED_MARKET = requestAction(
  '/trading/SET_SELECTED_MARKET',
);
export const SET_NEW_POSITION = requestAction('/trading/SET_NEW_POSITION');
export const DELETE_POSITION = requestAction('/trading/DELETE_POSITION');
export const SET_SPREAD = requestAction('/trading/SET_SPREAD');

// USER
export const DELETE_USER = requestAction('/user/DELETE_USER');
export const LOG_OUT = requestAction('/user/LOG_OUT');
export const LOG_IN = requestAction('/user/LOG_IN');
export const SET_USER_NAME = requestAction('/user/SET_USER_NAME');
export const CHECK_USER = requestAction('/user/CHECK_USER');
export const GET_USER = requestAction('/user/GET_USER');
export const SET_USER = requestAction('/user/SET_USER');
export const CREATE_NEW_USER = requestAction('/user/CREATE_NEW_USER');
export const SET_TRAIDING_ACCOUNT_TYPE = requestAction(
  '/user/SET_TRAIDING_ACCOUNT_TYPE',
);

// SERVICE WORKER
export const NEW_APP_AVAILABLE = requestAction('worker/NEW_APP_AVAILABLE');

// SOCKET.IO
export const INIT_CHAT_SOCKET = requestAction('socket/INIT_CHAT_SOCKET');
export const NEW_CHAT_MESSAGE = requestAction('socket/NEW_CHAT_MESSAGE');
