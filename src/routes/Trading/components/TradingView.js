import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Positions from './Positions';
import Trades from './Trades';
import BalanceCards from './BalanceCards';
import styles, {
  TradingContainer,
  ErrorContainer,
  TradingContent,
} from '../styles/trading';
import LogoAppBar from '../../../components/LogoAppBar';
import LinearGraph from '../../../components/LinearGraph';

import literals from '../../../i18n/es-ES';

const humanDate = 'DD [de] MMMM [de] YYYY';

class TradingView extends Component {
  state = {
    auth: true,
  };
  componentDidMount() {
    this.props.getMarketPrice().then((auth) => {
      console.log('IG auth', auth);
    });
    // const auth = prompt('Introduce la clave de acceso', '');
    // if (auth) {
    //   this.setState({ auth: auth === 'koky' && true });
    // }
  }

  render() {
    const { classes } = this.props;
    return (
      <TradingContainer>
        <AppBar position="sticky" color="secondary">
          <Toolbar>
            <LogoAppBar />
            <Typography variant="h6" color="inherit">
              Adolfo Onrubia |{' '}
              <span
                style={{
                  textTransform: 'uppercase',
                  fontFamily: 'Rubik-Light',
                  fontSize: '.9rem',
                }}
              >
                Trading
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
        {this.state.auth ? (
          <TradingContent>
            <h1 className={classes.h1}>{literals.TRADING.title}</h1>
            <BalanceCards {...this.props} />
            <h2 className={classes.h2}>
              Balance Actual {moment().format(humanDate)}
            </h2>
            <LinearGraph data={this.props.equity} />
            <Positions {...this.props} />
            <Trades {...this.props} />
          </TradingContent>
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

TradingView.propTypes = {
  equity: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,
  getMarketPrice: PropTypes.func.isRequired,
};

export default withStyles(styles)(TradingView);
