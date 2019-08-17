import React, { Component } from 'react';
import banner from '../../../assets/img/banner-trading.jpg';

class PortfolioItem extends Component {
  state = { expanded: false };
  randomNumber = Math.floor(Math.random() * 5) + 1;

  render() {
    return (
      <div
        className={`card card--${this.randomNumber} ${
          this.state.expanded ? 'card--expanded' : ''
        }`}
        onClick={() => {
          this.setState({ expanded: !this.state.expanded });
        }}
      >
        <div>
          <div className="card__avatar">
            <img alt="banner" src={banner} />
          </div>
          <div className="card__title" />
          <div className="card__description" />
        </div>
      </div>
    );
  }
}

export default PortfolioItem;
