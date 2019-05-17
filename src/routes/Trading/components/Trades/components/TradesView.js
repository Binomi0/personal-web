import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGa from 'react-ga';
import { Button } from '@material-ui/core';

import Separator from '../../../../../components/Separator';
import { TradesContainer } from '../styles/trades';
import Modals from '../modals';
import Balance from './BalanceView';

class Trades extends Component {
  componentDidMount() {
    this.getTrades();
  }

  handleMoreInfoClick = () => {
    this.props.openModal('TRADES_MORE_INFO');
    ReactGa.event({
      label: 'Trades',
      category: 'Trading',
      action: 'More Info',
      nonInteraction: false,
    });
  };

  getTrades = () => {
    this.props.getTrades();
  };

  render() {
    const {
      classes,
      // equity,
      tournament,
    } = this.props;

    // console.log(this.constructor.name, this.props);
    return (
      <TradesContainer>
        <Modals {...this.props} />
        {/* <h1 className={classes.h1}>Histórico de operaciones</h1> */}
        {/* <Balance classes={classes} equity={equity} /> */}

        <h1 className={classes.h1}>Trades finalizados Mayo 2019</h1>
        <Balance title="Número de pips" classes={classes} equity={tournament} />
        <Separator />
        <Button
          onClick={this.handleMoreInfoClick}
          variant="contained"
          color="secondary"
          size="small"
        >
          Más información
        </Button>
      </TradesContainer>
    );
  }
}

Trades.propTypes = {
  classes: PropTypes.object.isRequired,
  equity: PropTypes.array.isRequired,
  tournament: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
};

export default Trades;
