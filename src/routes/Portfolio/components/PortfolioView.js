import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import LogoAppBar from '../../../components/LogoAppBar';
import { PortfolioContainer } from '../styles/portfolio';
import PortfolioGrid from './PortfolioGrid';

export default class PortfolioView extends Component {
  state = {
    'grid-gap': false,
    'grid-template-columns': false,
  };

  render() {
    return (
      <PortfolioContainer selected>
        <AppBar position="sticky" color="secondary">
          <Toolbar>
            <LogoAppBar />
            <Typography variant="h6" color="inherit">
              Adolfo Onrubia |{' '}
              <span
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 100,
                  fontSize: '.9rem',
                }}
              >
                Portfolio
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
        <PortfolioGrid settings={this.state} />
      </PortfolioContainer>
    );
  }
}
