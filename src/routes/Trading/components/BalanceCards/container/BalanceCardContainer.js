import { connect } from 'react-redux';
import BalanceCards from '../components/BalanceCards';

import { actions as positionActions } from '../../Positions/modules/positions';
import { actions as modalActions } from '../../../../../reducers/modal';
import { actions as balanceActions } from '../modules/balanceCards';

const mapStateToProps = ({ trading }) => ({
  prices: trading.prices,
  equity: trading.balance.equity,
  liveStream: trading.prices.liveStream,
});

const mapDispatchToProps = {
  ...positionActions,
  ...modalActions,
  ...balanceActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceCards);
