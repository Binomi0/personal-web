import { connect } from 'react-redux';

import TradingView from '../components/TradingView';
import { actions } from '../modules/trading';

export const mapStateToProps = ({ trading }) => ({
  ethereum: trading.ethereum,
});

export const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradingView);
