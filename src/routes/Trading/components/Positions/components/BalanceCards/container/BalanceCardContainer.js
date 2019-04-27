import { connect } from 'react-redux';
import BalanceCards from '../components/BalanceCards';

import { actions as positionActions } from '../../../modules/positions';
import { actions as modalActions } from '../../../../../../../reducers/modal';
import { actions as balanceActions } from '../../../modules/balance';
import { withStyles } from '@material-ui/core';

import styles from '../styles/balanceCards';

const mapStateToProps = ({ trading }) => ({
  prices: trading.prices,
  equity: trading.balance.equity,
});

const mapDispatchToProps = {
  ...positionActions,
  ...modalActions,
  ...balanceActions,
};

const BalanceCardWrapped = withStyles(styles)(BalanceCards);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceCardWrapped);
