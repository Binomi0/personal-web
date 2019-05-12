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
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

import history from '../redux/history';
import { actions as drawerActions } from '../reducers/drawer';
import { actions as modalActions } from '../reducers/modal';
import LogoAppBar from '../components/LogoAppBar';
import { SubtitleStyled } from './styles';

import styles from './styles';

class MyAppBar extends React.Component {
  handleClickMenu = () => {
    if (this.props.user.email) {
      this.props.openDrawer('TRADING_MENU');
      return;
    }
    this.props.openModal('ADD_USER');
  };

  render() {
    const { title, subtitle, color, classes, user } = this.props;

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
              onClick={() => history.goBack()}
            >
              {title}
              <SubtitleStyled>{subtitle}</SubtitleStyled>
            </Typography>
            <IconButton
              onClick={this.handleClickMenu}
              color="inherit"
              aria-label="Menu"
            >
              {user.email ? <MenuIcon /> : <AddIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const StyledAppBar = withStyles(styles)(MyAppBar);

const mapDispatchToProps = { ...drawerActions, ...modalActions };

MyAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(StyledAppBar);
