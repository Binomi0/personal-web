import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';

const columns = ['Fecha', 'Precio Entrada', 'Cantidad', 'Dirección'];

const data = [
  ['7 de Mayo de 2019', 618.36, 0.2799, 'Largo'],
  ['25 de Junio de 2019', 402.47, 0.7167, 'Largo'],
  ['2 de Agosto de 2019', 363.23, 0.5294, 'Largo'],
  ['14 de Agosto de 2019', 233.06, 0.9489, 'Largo'],
];

const options = {
  filterType: 'checkbox',
};

class Trades extends Component {
  componentDidMount() {
    this.props.getEthereumPrice('buy');
  }

  render() {
    const { buy } = this.props.ethereum;
    return (
      <div>
        <h1>Trades</h1>
        <MUIDataTable
          title={`Precio ETH: ${buy} €`}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

Trades.propTypes = {
  getEthereumPrice: PropTypes.func.isRequired,
  ethereum: PropTypes.shape({
    buy: PropTypes.string.isRequired,
  }),
};

export default Trades;
