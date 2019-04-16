import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import TradingView from '../components/TradingView';
import { actions } from '../modules/trading';

import styles from '../styles/trading';

export const mapStateToProps = ({ trading }) => ({
  ethereum: trading.ethereum,
  positions: trading.positions,
  trades: trading.trades,
  equity: trading.equity,
});

export const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TradingView));
