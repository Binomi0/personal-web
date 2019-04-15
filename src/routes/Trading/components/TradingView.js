import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Trades from './Trades';
import { TradingContainer, ErrorContainer } from '../styles/trading';
import { Typography } from '@material-ui/core';

export default class TradingView extends Component {
  state = {
    auth: true,
  };
  componentDidMount() {
    // const auth = prompt('Introduce la clave de acceso', '');
    // if (auth) {
    //   this.setState({ auth: auth === 'koky' && true });
    // }
  }

  render() {
    return (
      <TradingContainer>
        {this.state.auth ? (
          <>
            <h1>Mis operaciones en bolsa</h1>
            <Trades {...this.props} />
          </>
        ) : (
          <ErrorContainer>
            <h1>No tienes acceso para ver esta sección</h1>
            <Link to="/">
              <Typography variant="subtitle2">
                Ir a la página principal
              </Typography>
            </Link>
          </ErrorContainer>
        )}
      </TradingContainer>
    );
  }
}
