import React, { Component } from 'react';

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
        <PortfolioGrid settings={this.state} />
      </PortfolioContainer>
    );
  }
}
