import React, { Component } from 'react';
import { wrapGrid } from 'animate-css-grid';
import PortFolioItem from './PortfolioItem';

import '../styles/portfolio.scss';

class PortfolioGrid extends Component {
  componentDidMount() {
    // will automatically clean itself up when dom node is removed
    wrapGrid(this.grid, {
      easing: 'backOut',
      stagger: 10,
      duration: 400,
    });
  }

  render() {
    let classes = 'grid';
    Object.keys(this.props.settings)
      .filter((k) => this.props.settings[k])
      .forEach((k) => (classes += ' ' + k));
    return (
      <div className={classes} ref={(el) => (this.grid = el)}>
        {[...Array(32).keys()].map((i) => (
          <PortFolioItem key={i} />
        ))}
      </div>
    );
  }
}

export default PortfolioGrid;
