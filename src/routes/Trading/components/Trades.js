import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Typography } from '@material-ui/core';

import { PositionContainer, TradingContainer } from '../styles/trading';
import { myMarkets, columns } from '../modules/constants';

class Trades extends Component {
  state = {
    US30: [],
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
    if (nextProps.trades.US30.length !== nextState.US30.length) {
      this.setState({ US30: [...nextProps.trades.US30] });
    }
  }

  render() {
    const { classes, trades } = this.props;
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
      US30: 'Indice Dow Jones US30',
    };

    return (
      <TradingContainer>
        <h2 className={classes.h2}>Histórico de operaciones en el mercado</h2>

        {myMarkets.map((market) => {
          return (
            <PositionContainer key={market}>
              <Typography color="secondary" variant="h2">
                {market}
              </Typography>
              <MUIDataTable
                title={title[market]}
                data={this.state[market]}
                columns={columns}
                options={options}
              />
            </PositionContainer>
          );
        })}
      </TradingContainer>
    );
  }
}

Trades.propTypes = {
  classes: PropTypes.object.isRequired,
  trades: PropTypes.shape({
    US30: PropTypes.array.isRequired,
    DAX: PropTypes.array.isRequired,
  }).isRequired,
};

export default Trades;
