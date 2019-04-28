import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import PositionView from '../components/PositionView';
import { actions } from '../modules/positions';
import { actions as priceActions } from '../modules/prices';
import { actions as balanceActions } from '../modules/balance';
import { actions as tradeActions } from '../../Trades/modules/trades';
import { actions as modalActions } from '../../../../../reducers/modal';
import styles from '../styles/positions';

export const mapStateToProps = ({ trading }) => ({
  positions: trading.positions,
});

export const mapDispatchToProps = {
  ...actions,
  ...modalActions,
  ...tradeActions,
  ...priceActions,
  ...balanceActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PositionView));
