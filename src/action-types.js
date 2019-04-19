function requestAction(action) {
  return {
    REQUEST: `${action}_REQUEST`,
    SET: `${action}_SET`,
    SUCCESS: `${action}_SUCCESS`,
    FAILURE: `${action}_FAILURE`,
  };
}

export const GET_IG_PRICES = requestAction('/trading/GET_IG_PRICE');
export const GET_COINBASE_PRICE = requestAction('/trading/GET_COINBASE_PRICE');
export const GET_POSITIONS = requestAction('/trading/GET_POSITIONS');
export const GET_TRADES = requestAction('/trading/GET_TRADES');
export const CALCULATE_EQUITY = requestAction('/trading/CALCULATE_EQUITY');
export const ADD_POSITION = requestAction('/trading/ADD_POSITION');
export const EXIT_POSITION = requestAction('/trading/EXIT_POSITION');
export const GET_POSITION_EQUITY = requestAction(
  '/trading/GET_POSITION_EQUITY',
);
