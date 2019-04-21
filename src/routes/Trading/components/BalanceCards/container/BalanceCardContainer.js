import { connect } from 'react-redux';
import BalanceCards from '../components/BalanceCards';

import { actions as positionActions } from '../../Positions/modules/positions';
import { actions as modalActions } from '../../../../../reducers/modal';

const mapStateToProps = ({ trading }) => ({
  prices: trading.prices,
  equity: trading.positions.equity,
});

const mapDispatchToProps = { ...positionActions, ...modalActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceCards);
