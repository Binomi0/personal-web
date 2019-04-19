import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import PositionView from '../components/PositionView';
import { actions } from '../modules/positions';

import styles from '../styles/positions';

export const mapStateToProps = ({ trading }) => ({
  prices: trading.prices,
  trades: trading.trades,
  equity: trading.positions.equity,
  positions: trading.positions,
});

export const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PositionView));
