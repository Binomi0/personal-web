import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import { actions as drawerActions } from '../reducers/drawer';
import LogoAppBar from '../components/LogoAppBar';
import { SubtitleStyled } from './styles';

import styles from './styles';

const MyAppBar = ({ title, subtitle, color, classes, openDrawer }) => {
  return (
    <div>
      <AppBar position="sticky" color={color}>
        <Toolbar>
          <Link to="/">
            <LogoAppBar />
          </Link>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
            <SubtitleStyled>{subtitle}</SubtitleStyled>
          </Typography>
          <IconButton
            onClick={() => openDrawer('TRADING_MENU')}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const StyledAppBar = withStyles(styles)(MyAppBar);

const mapDispatchToProps = { ...drawerActions };

MyAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(StyledAppBar);
