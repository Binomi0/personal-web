import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TradesContainer, TradeContainer } from '../styles/trades';
import Balance from './BalanceView';

class Trades extends Component {
  componentDidMount() {
    this.getTrades();
  }

  getTrades = () => {
    this.props.getTrades();
  };

  render() {
    const { classes, equity, tournament } = this.props;

    // console.log(this.constructor.name, this.props);
    return (
      <TradesContainer>
        <h1 className={classes.h1}>Histórico de operaciones</h1>
        <Balance classes={classes} equity={equity} />
        <Balance
          title="Reto De 100 a 100.000"
          classes={classes}
          equity={tournament}
        />
        <TradeContainer />
      </TradesContainer>
    );
  }
}

Trades.propTypes = {
  classes: PropTypes.object.isRequired,
  equity: PropTypes.array.isRequired,
  tournament: PropTypes.array.isRequired,
};

export default Trades;
