import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import TradingView from '../components/TradingView';
import { actions as tradingActions } from '../modules/trading';
import { actions as modalActions } from '../../../reducers/modal';

import styles from '../styles/trading';

export const mapStateToProps = ({ trading, modal, auth }) => ({
  selectedMarket: trading.positions.selectedMarket,
  newPosition: trading.positions.newPosition,
  modal,
  authenticated: auth.authenticated,
});

export const mapDispatchToProps = {
  ...tradingActions,
  ...modalActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TradingView));
