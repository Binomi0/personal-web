import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import TradesView from '../components/TradesView';
import { actions } from '../modules/trades';
import { actions as modalActions } from '../../../../../reducers/modal';

import styles from '../styles/trades';

const mapStateToProps = ({ trading, modal }) => ({
  equity: trading.trades.equity,
  tournament: trading.trades.equity,
  modalOpen: modal.open,
  modalType: modal.type,
});

const mapDispatchToProps = { ...actions, ...modalActions };

const TradesViewWrapped = withStyles(styles)(TradesView);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradesViewWrapped);
