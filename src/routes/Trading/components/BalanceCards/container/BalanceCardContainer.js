import { connect } from 'react-redux';
import BalanceCards from '../components/BalanceCards';

const mapStateToProps = ({ trading }) => ({
  prices: trading.prices,
  equity: trading.positions.equity,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceCards);
