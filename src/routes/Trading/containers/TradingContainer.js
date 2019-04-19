import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import TradingView from '../components/TradingView';
import { actions as tradingActions } from '../modules/trading';

import styles from '../styles/trading';

export const mapStateToProps = (state, ownProps) => ({
  state,
  ownProps,
});

export const mapDispatchToProps = { ...tradingActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TradingView));
