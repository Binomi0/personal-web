import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoadingBar } from 'react-redux-loading-bar';
import moment from 'moment';
import { withStyles, AppBar, Toolbar, Typography } from '@material-ui/core';

import Positions from './Positions';
// import Trades from './Trades';
import BalanceCards from './BalanceCards';
import Modals from '../modals';
import LogoAppBar from '../../../components/LogoAppBar';
import LinearGraph from '../../../components/LinearGraph';

import literals from '../../../i18n/es-ES';
import { CRYPTOS } from '../modules/constants';

import styles, {
  TradingContainer,
  ErrorContainer,
  TradingContent,
} from '../styles/trading';

// TODO Export to constants
const humanDate = 'DD [de] MMMM [de] YYYY';

class TradingView extends Component {
  state = {
    auth: true,
  };
  componentDidMount() {
    this.props.getCoinbasePrice(CRYPTOS.ETH);
    this.props.getIGMarketPrice('DOW');
    this.props.getIGMarketPrice('DAX');
    this.props.getTrades();
    // this.props.getChartData('DOW', 100);
    // this.props.getChartData('DAX', 100);
    // const auth = prompt('Introduce la clave de acceso', '');
    // if (auth) {
    //   this.setState({ auth: auth === 'koky' && true });
    // }
  }

  // TODO Add doc to openModal
  openModal = (modalType) => {
    this.props.openModal(modalType);
  };

  // TODO Add doc to handleClosePosition
  handleClosePosition = () => {};
  // TODO Add doc to handleSelectMarket
  handleSelectMarket = () => {};
  // TODO Add doc to handleOpenPosition
  handleOpenPosition = () => {
    const { selectedMarket, newPosition } = this.props;
    this.props.onOpenPosition(selectedMarket, newPosition);
  };

  render() {
    const { classes } = this.props;

    // console.log(this.constructor.name, '=>', this.props);
    return (
      <TradingContainer>
        <LoadingBar showFastActions />
        <Modals />

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
            <h2 className={classes.h2}>{literals.TRADING.subtitle}</h2>
            <BalanceCards />
            <h2 className={classes.h2}>
              Balance Actual {moment().format(humanDate)}
            </h2>
            <LinearGraph data={this.props.equity} />
            <Positions />
            {/* {this.props.match.url === '/trading/trades' && <Trades />} */}
            {/* <Trades /> */}
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
  equity: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  getIGMarketPrice: PropTypes.func.isRequired,
  getCoinbasePrice: PropTypes.func.isRequired,
  selectedMarket: PropTypes.string.isRequired,
  newPosition: PropTypes.object.isRequired,
};

export default withStyles(styles)(TradingView);
