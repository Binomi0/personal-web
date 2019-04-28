import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, withWidth } from '@material-ui/core';

import Table from '../../../../../components/Table';
import { PositionsContainer, PositionContainer } from '../styles/positions';
import BalanceCards from '../components/BalanceCards';
import { MARKETS, CRYPTOS } from '../../../modules/constants';

class PositionsView extends Component {
  static propType = {
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
    getIGAuthentication: PropTypes.func.isRequired,
    getIGLightStreamer: PropTypes.func.isRequired,
    getCoinbasePrice: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.getPositions();
    this.getPrices();
  }

  handleClickOpen = () => {
    this.props.openModal('SELECT_MARKET');
  };

  onExitPosition = (market) => {
    this.props.onExitPosition(market);
  };

  getPrices = () => {
    this.props.getCoinbasePrice(CRYPTOS.ETH);
    this.props.getIGAuthentication(() => {
      this.props.getIGLightStreamer(MARKETS.IG_EPIC_DOW);
      this.props.getIGLightStreamer(MARKETS.IG_EPIC_DAX);
    });
  };

  getPositions = () => {
    this.props.getPositions();
  };

  render() {
    const { positions } = this.props;
    const mobile = ['xl', 'lg', 'md'].includes(this.props.width);

    // console.log(this.constructor.name, this.props);
    return (
      <PositionsContainer>
        <BalanceCards positions={positions} />
        {mobile && (
          <PositionContainer>
            {positions && positions.open.length && (
              <Table
                positions={positions.open}
                onExitPosition={this.onExitPosition}
              />
            )}
          </PositionContainer>
        )}
      </PositionsContainer>
    );
  }
}

export default withWidth()(PositionsView);
