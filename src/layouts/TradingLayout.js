import React, { Component } from 'react';
import { LoadingBar } from 'react-redux-loading-bar';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Modals from '../routes/Trading/modals';
import LogoAppBar from '../components/LogoAppBar';

export default class TradingLayout extends Component {
  render() {
    return (
      <div>
        <LoadingBar showFastActions />
        <Modals />

        <AppBar position="sticky" color="secondary">
          <Toolbar>
            <Link to="/">
              <LogoAppBar />
            </Link>
            <Typography variant="h6" color="inherit">
              Adolfo Onrubia |{' '}
              <span
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 100,
                  fontSize: '.9rem',
                }}
              >
                TRADING
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}
