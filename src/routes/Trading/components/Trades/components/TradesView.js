import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGa from 'react-ga';

import { TradesContainer, TradeContainer } from '../styles/trades';
import Balance from './BalanceView';
import { Button } from '@material-ui/core';

class Trades extends Component {
  componentDidMount() {
    this.getTrades();
  }

  handleMoreInfoClick = () => {
    ReactGa.event({});
  };

  getTrades = () => {
    this.props.getTrades();
  };

  render() {
    const { classes, equity, tournament } = this.props;

    // console.log(this.constructor.name, this.props);
    return (
      <TradesContainer>
        {/* <h1 className={classes.h1}>Histórico de operaciones</h1> */}
        <Balance classes={classes} equity={equity} />

        <h1 className={classes.h1}>Inicio el 1 Junio de 2019</h1>
        <Balance
          title="Reto De 1.000 a 100.000"
          classes={classes}
          equity={tournament}
        />
        <TradeContainer>
          <Button
            onClick={this.handleMoreInfoClick}
            variant="contained"
            color="secondary"
            size="large"
          >
            Más información
          </Button>
        </TradeContainer>
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
