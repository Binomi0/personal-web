import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';

import Table from '../Table';
import SelectMarket from '../../modals/SelectMarket';
import NewTrade from '../../modals/NewTrade';
import { Typography } from '@material-ui/core';

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
    selectedMarket: '',
    position: {},
  };
  componentDidMount() {
    this.props.getEthereumPrice('buy');
    this.getPositions();
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

  openPosition = (position) => {
    this.props.openPosition(this.state.selectedMarket, position);
    this.getPositions();
  };

  getPositions = () => {
    this.props.getPositions();
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
        <h1>Trades</h1>
        <Typography variant="h5">{this.state.selectedMarket}</Typography>
        {myMarkets.map((market) => (
          <PositionContainer key={market}>
            {positions && positions[market] && (
              <Table position={positions[market]} market={market} />
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
        {isAdmin && <button onClick={this.handleClickOpen}>New Trade</button>}
      </div>
    );
  }
}

Trades.propTypes = {
  getEthereumPrice: PropTypes.func.isRequired,
  ethereum: PropTypes.shape({
    buy: PropTypes.string.isRequired,
  }),
  positions: PropTypes.object.isRequired,
};

export default Trades;
