import { connect } from 'react-redux';
import TradesView from '../components/TradesView';
import { actions } from '../modules/trades';
import { withStyles } from '@material-ui/core';

import styles from '../styles/trades';

const mapStateToProps = ({ trading }) => ({
  equity: trading.trades.equity,
  tournament: trading.trades.equity,
});

const mapDispatchToProps = { ...actions };

const TradesViewWrapped = withStyles(styles)(TradesView);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradesViewWrapped);
