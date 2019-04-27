import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Typography } from '@material-ui/core';

import { TradesContainer, TradeContainer } from '../styles/trades';
import { myMarkets, columns } from '../../../modules/constants';
import Balance from './BalanceView';

class Trades extends Component {
  state = {
    DOW: [],
    DAX: [],
  };

  componentDidMount() {
    this.getTrades();
  }

  getTrades = () => {
    this.props.getTrades();
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.trades.DAX.length !== nextState.DAX.length) {
      this.setState({ DAX: [...nextProps.trades.DAX] });
    }
    if (nextProps.trades.DOW.length !== nextState.DOW.length) {
      this.setState({ DOW: [...nextProps.trades.DOW] });
    }
  }

  render() {
    const { classes, trades, equity } = this.props;
    const options = {
      filterType: 'checkbox',
      serverSide: true,
      onTableChange: (action, tableState) => {},
      customBodyRender: (cellValue, rowIndex, columnIndex) => {
        console.log(cellValue);
        return cellValue;
      },
    };

    if (!trades) {
      return 'Cargando';
    }

    const title = {
      DAX: 'Indice Alemania 30',
      DOW: 'Indice Dow Jones DOW',
    };

    console.log(this.constructor.name, this.props);

    return (
      <TradesContainer>
        <h2 className={classes.h2}>Histórico de operaciones en el mercado</h2>
        <Balance classes={classes} equity={equity} />
        <TradeContainer>
          {/* <MUIDataTable
            title={title[market]}
            data={this.state[market]}
            columns={columns}
            options={options}
          /> */}
        </TradeContainer>
      </TradesContainer>
    );
  }
}

Trades.propTypes = {
  classes: PropTypes.object.isRequired,
  trades: PropTypes.shape({
    DOW: PropTypes.array.isRequired,
    DAX: PropTypes.array.isRequired,
  }).isRequired,
};

export default Trades;
