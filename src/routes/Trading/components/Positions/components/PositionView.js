import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Fab } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import Table from '../../../../../components/Table';

import { PositionContainer } from '../styles/positions';
import { TradingContainer } from '../../../styles/trading';
import { myMarkets } from '../../../modules/constants';

class PositionsView extends Component {
  state = {
    product: '',
  };
  componentDidMount() {
    this.getPositions();
    // this.lsClient = this.props.lightStreamer;
    // console.log('this.client =>', this.lsClient);

    // this.lsClient.createConnection();
    // this.lsClient.addSubscription(MARKETS.DOW);
  }

  handleClickOpen = () => {
    this.props.openModal('SELECT_MARKET');
  };

  onExitPosition = (market) => {
    this.props.onExitPosition(market);
  };

  getPositions = () => {
    this.props.getPositions();
  };

  render() {
    const { positions } = this.props;
    const isAdmin = Boolean(localStorage.getItem('isAdmin'));

    // console.log(this.constructor.name, this.props);

    return (
      <TradingContainer>
        <Typography variant="h5">{this.state.selectedMarket}</Typography>
        {myMarkets.map((market) => (
          <PositionContainer key={market}>
            {positions && positions[market] && (
              <Table
                position={positions[market]}
                market={market}
                onExitPosition={this.onExitPosition}
              />
            )}
          </PositionContainer>
        ))}
        {isAdmin && (
          <Fab onClick={this.handleClickOpen} color="secondary">
            <AddIcon />
          </Fab>
        )}
      </TradingContainer>
    );
  }
}

PositionsView.propTypes = {
  classes: PropTypes.object.isRequired,
  onOpenPosition: PropTypes.func.isRequired,
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
