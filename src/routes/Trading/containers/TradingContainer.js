import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import TradingView from '../components/TradingView';
import { actions as tradingActions } from '../modules/trading';
import { actions as tradesActions } from '../components/Trades/modules/trades';
import { actions as modalActions } from '../../../reducers/modal';

import styles from '../styles/trading';

export const mapStateToProps = ({ trading, modal }) => ({
  equity: trading.trades.equity,
  selectedMarket: trading.positions.selectedMarket,
  newPosition: trading.positions.newPosition,
  modal,
});

export const mapDispatchToProps = {
  ...tradingActions,
  ...tradesActions,
  ...modalActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TradingView));
