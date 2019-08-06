import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import BiographyContext from '../context/BiographyContext';
import BiographyView from '../components/BiographyView';
import styles from '../styles';

export const actions = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

BiographyView.contextType = BiographyContext;
const StyledBiographyView = withStyles(styles)(BiographyView);
const ConnectedBiography = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledBiographyView);

export default ConnectedBiography;
