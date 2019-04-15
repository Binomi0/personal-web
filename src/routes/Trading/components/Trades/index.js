import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Typography, Button } from '@material-ui/core';

import Table from '../Table';
import SelectMarket from '../../modals/SelectMarket';
import NewTrade from '../../modals/NewTrade';
import ExitPosition from '../../modals/ExitPosition';

import { PositionContainer } from '../../styles/trading';
import { myMarkets, columns, data } from '../../modules/constants';

const options = {
  filterType: 'checkbox',
};

class Trades extends Component {
  state = {
    product: '',
    selectMarketOpen: false,
    newTradeOpen: false,
    exitPositionOpen: false,
    selectedMarket: '',
    position: {},
  };
  componentDidMount() {
    this.props.getEthereumPrice('buy');
    this.getPositions();
    this.getTrades();
  }

  handleClickOpen = () => {
    this.setState({
      selectMarketOpen: true,
    });
  };

  handleCloseSelectMarket = (value) => {
    this.setState({
      selectedMarket: value,
      selectMarketOpen: false,
      newTradeOpen: true,
    });
  };

  handleCloseNewTrade = (position) => {
    this.setState({ position, newTradeOpen: false }, () =>
      this.openPosition(position),
    );
  };

  handleCloseExitPosition = (closePosition) => {
    this.setState({ newTradeOpen: false }, () => {
      this.props.exitPosition(this.state.selectedMarket, closePosition);
    });
  };

  exitPosition = (market) => {
    this.setState({ selectedMarket: market, exitPositionOpen: true });
  };

  openPosition = (position) => {
    this.props.openPosition(this.state.selectedMarket, position);
  };

  getPositions = () => {
    this.props.getPositions();
  };

  getTrades = () => {
    this.props.getTrades();
  };

  render() {
    const { buy } = this.props.ethereum;
    const { positions } = this.props;
    const isAdmin = Boolean(localStorage.getItem('isAdmin'));

    return (
      <div>
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
        <h1>Trades</h1>
        <Typography variant="h5">{this.state.selectedMarket}</Typography>
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
          <MUIDataTable
            title={`Precio ETH: ${buy} €`}
            data={data}
            columns={columns}
            options={options}
          />
        </PositionContainer>
        {isAdmin && (
          <Button onClick={this.handleClickOpen}>Open Position</Button>
        )}
      </div>
    );
  }
}

Trades.propTypes = {
  openPosition: PropTypes.func.isRequired,
  getEthereumPrice: PropTypes.func.isRequired,
  ethereum: PropTypes.shape({
    buy: PropTypes.string.isRequired,
  }),
  positions: PropTypes.object.isRequired,
  getTrades: PropTypes.func.isRequired,
  getPositions: PropTypes.func.isRequired,
};

export default Trades;
