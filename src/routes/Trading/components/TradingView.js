import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { LoadingBar } from 'react-redux-loading-bar';
import { withStyles, AppBar, Toolbar, Typography } from '@material-ui/core';

import Positions from './Positions';
import Trades from './Trades';

import Modals from '../modals';
import LogoAppBar from '../../../components/LogoAppBar';
import literals from '../../../i18n/es-ES';
import {} from '../modules/constants';

import styles, {
  TradingContainer,
  ErrorContainer,
  TradingContent,
} from '../styles/trading';

class TradingView extends Component {
  state = {
    auth: true,
  };
  componentDidMount() {
    ReactGA.pageview('/trading');
    ReactGA.event({
      category: 'User',
      action: 'Navigates to trading',
      value: 1,
      label: 'Visited Trading Page',
      nonInteraction: true,
    });
    // this.props.getTrades();
    // this.props.getChartData('DOW', 100);
    // this.props.getChartData('DAX', 100);
    // const auth = prompt('Introduce la clave de acceso', '');
    // if (auth) {
    //   this.setState({ auth: auth === 'koky' && true });
    // }
  }

  // TODO Add doc to handleOpenPosition
  handleOpenPosition = () => {
    const { selectedMarket, newPosition } = this.props;
    this.props.onOpenPosition(selectedMarket, newPosition);
    ReactGA.event({
      category: 'Trading',
      action: 'Open a new position',
      value: 1,
      label: 'Open Position',
    });
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
                  fontWeight: 100,
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
            <Positions />

            {/* {this.props.match.url === '/trading/trades' && <Trades />} */}
            <Trades />
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
  selectedMarket: PropTypes.string.isRequired,
  newPosition: PropTypes.object.isRequired,
};

export default withStyles(styles)(TradingView);
