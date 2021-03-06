import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import history from '../redux/history';
import { actions as drawerActions } from '../reducers/drawer';
import { actions as modalActions } from '../reducers/modal';
import LogoAppBar from '../components/LogoAppBar';

import styles, { SubtitleStyled } from './styles';
import './styles/firebaseui-styling.global.css';

// const uiConfig = {
//   signInFlow: 'popup',
//   signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
//   callbacks: {
//     signInSuccessWithAuthResult: () => false,
//   },
// };

class MyAppBar extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    openDrawer: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
  };

  handleClickMenu = () => {
    if (this.props.authenticated) {
      this.props.openDrawer('TRADING_MENU');
      return;
    }
    this.props.openModal('ADD_USER');
  };

  render() {
    const { title, subtitle, color, classes, authenticated } = this.props;

    // console.log('this.props', this.props);
    return (
      <div>
        <AppBar position="sticky" color={color}>
          <Toolbar>
            <Link to="/">
              <LogoAppBar />
            </Link>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              onClick={() => history.push('/')}
            >
              {title}
              <SubtitleStyled>{subtitle}</SubtitleStyled>
            </Typography>
            <IconButton
              className={classes.menuButton}
              onClick={this.handleClickMenu}
              color="inherit"
              aria-label="Menu"
            >
              {authenticated && (
                <Avatar src={this.props.user.photoURL} alt="user-profile-img" />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const StyledAppBar = withStyles(styles)(MyAppBar);

const mapStateToProps = ({ auth, user }) => ({
  authenticated: auth.authenticated,
  user,
});

const mapDispatchToProps = { ...drawerActions, ...modalActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledAppBar);
