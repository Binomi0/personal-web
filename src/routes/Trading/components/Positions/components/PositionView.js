import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Typography, Button } from '@material-ui/core';

import Table from '../../../../../components/Table';
import SelectMarket from '../../../modals/SelectMarket';
import NewTrade from '../../../modals/NewTrade';
import ExitPosition from '../../../modals/ExitPosition';

import { PositionContainer } from '../styles/positions';
import { TradingContainer } from '../../../styles/trading';
import { myMarkets, columns, data } from '../../../modules/constants';

const options = {
  filterType: 'checkbox',
};

class PositionsView extends Component {
  state = {
    product: '',
    selectMarketOpen: false,
    newTradeOpen: false,
    exitPositionOpen: false,
    selectedMarket: '',
    position: {},
  };
  componentDidMount() {
    this.getPositions();
  }

  handleClickOpen = () => {
    this.setState({
      selectMarketOpen: true,
    });
  };

  handleCloseSelectMarket = (value) => {
    if (value) {
      this.setState({
        selectedMarket: value,
        selectMarketOpen: false,
        newTradeOpen: true,
      });
    } else {
      this.setState({ selectMarketOpen: false });
    }
  };

  handleCloseNewTrade = (position) => {
    this.setState({ position, newTradeOpen: false }, () =>
      this.openPosition(position),
    );
  };

  handleCloseExitPosition = (closePosition) => {
    this.setState({ exitPositionOpen: false }, () => {
      this.props.exitPosition(this.state.selectedMarket, closePosition);
    });
  };

  exitPosition = (market) => {
    console.log('exitPosition =>', market);
    this.setState({ selectedMarket: market, exitPositionOpen: true });
  };

  openPosition = (position) => {
    this.props.openPosition(this.state.selectedMarket, position);
  };

  getPositions = () => {
    this.props.getPositions();
  };

  render() {
    const amount = this.props.prices.coinbase.ETH.amount || '-';
    const { classes, positions } = this.props;
    const isAdmin = Boolean(localStorage.getItem('isAdmin'));

    return (
      <TradingContainer>
        <SelectMarket
          selectedMarket={this.state.selectedMarket}
          open={this.state.selectMarketOpen}
          onClose={this.handleCloseSelectMarket}
        />
        <NewTrade
          selectedMarket={this.state.selectedMarket}
          open={this.state.newTradeOpen}
          onClose={this.handleCloseNewTrade}
        />
        <ExitPosition
          open={this.state.exitPositionOpen}
          onClose={this.handleCloseExitPosition}
        />
        <h2 className={classes.h2}>Posiciones abiertas en el mercado</h2>
        <Typography variant="h5">{this.state.selectedMarket}</Typography>
        {positions && (positions['DAX'] || positions['DOW']) && (
          <Typography variant="h6" color="secondary">
            Intradía
          </Typography>
        )}
        {myMarkets.map((market) => (
          <PositionContainer key={market}>
            {positions && positions[market] && (
              <Table
                position={positions[market]}
                market={market}
                exitPosition={this.exitPosition}
              />
            )}
          </PositionContainer>
        ))}
        <PositionContainer>
          <Typography variant="h6" color="secondary">
            Largo Plazo
          </Typography>
          <MUIDataTable
            title={`Precio ETH: ${amount} €`}
            data={data}
            columns={columns}
            options={options}
          />
        </PositionContainer>
        {isAdmin && (
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClickOpen}
          >
            Open Position
          </Button>
        )}
      </TradingContainer>
    );
  }
}

PositionsView.propTypes = {
  classes: PropTypes.object.isRequired,
  openPosition: PropTypes.func.isRequired,
  prices: PropTypes.shape({
    coinbase: PropTypes.shape({
      ETH: PropTypes.object.isRequired,
    }).isRequired,
    ig: PropTypes.shape({
      DOW: PropTypes.object.isRequired,
      DAX: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  positions: PropTypes.object.isRequired,
  getTrades: PropTypes.func.isRequired,
  getPositions: PropTypes.func.isRequired,
};

export default PositionsView;
