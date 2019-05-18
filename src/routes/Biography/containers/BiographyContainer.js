import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import BiographyView from '../components/BiographyView';
import styles from '../styles';

export const actions = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const StyledBiographyView = withStyles(styles)(BiographyView);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledBiographyView);
