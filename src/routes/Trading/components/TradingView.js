import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { withStyles, Typography } from '@material-ui/core';

import Positions from './Positions';
import Trades from './Trades';

import literals from '../../../i18n/es-ES';

import styles, {
  ErrorContainer,
  TradingContent,
  TradingBanner,
  Banner,
  TradingSection,
  TradingViewContainer,
} from '../styles/trading';
import bannerImg from '../../../assets/img/banner-trading.png';

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
    this.props.getChartData('DOW', 100);
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
      <TradingViewContainer>
        <TradingBanner>
          <Banner src={bannerImg} alt="banner" />
        </TradingBanner>
        {this.state.auth ? (
          <TradingContent>
            <TradingSection>
              <h1 className={classes.h1}>Reto Real Trading 2019</h1>

              <h2 className={classes.h2}>
                La meta es conseguir 99.000€ en un año con una cuenta real de
                1.000€
              </h2>
            </TradingSection>
            <TradingSection>
              <h1 className={classes.h1}>{literals.TRADING.title}</h1>
              <h2 className={classes.h2}>{literals.TRADING.subtitle}</h2>
              <Positions />
            </TradingSection>
            <TradingSection>
              <Trades />
            </TradingSection>

            {/* {this.props.match.url === '/trading/trades' && <Trades />} */}
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
      </TradingViewContainer>
    );
  }
}

TradingView.propTypes = {
  selectedMarket: PropTypes.string.isRequired,
  newPosition: PropTypes.object.isRequired,
};

export default withStyles(styles)(TradingView);
