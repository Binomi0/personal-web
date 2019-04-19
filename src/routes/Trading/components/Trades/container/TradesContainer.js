import { connect } from 'react-redux';
import TradesView from '../components/TradesView';
import { actions } from '../modules/trades';

const mapStateToProps = (state, ownProps) => ({
  trades: state,
});

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradesView);
