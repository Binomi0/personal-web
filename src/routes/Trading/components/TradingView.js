import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { withStyles, Typography, Button } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import SecurityIcon from '@material-ui/icons/Security';

// import Positions from './Positions';
// import Trades from './Trades';
import TradingChat from './Chat';
import Separator from '../../../components/Separator';
import TradingModals from '../modals';
import literals from '../../../i18n/es-ES';

import styles, {
  ErrorContainer,
  TradingContent,
  TradingBanner,
  Banner,
  TradingSection,
  TradingViewContainer,
  BoxTitle,
} from '../styles/trading';
import bannerImg from '../../../assets/img/banner-trading.png';
import firebase from '../../../config/firebase';

const LazyPositions = React.lazy(() => import('./Positions'));
const LazyTrades = React.lazy(() => import('./Trades'));

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

class TradingView extends Component {
  componentDidMount() {
    ReactGA.pageview('/trading');
    ReactGA.event({
      category: 'User',
      action: 'Navigates to trading',
      value: 1,
      label: 'Visited Trading Page',
      nonInteraction: true,
    });
    // this.props.getChartData('DOW', 100);
    // this.props.getChartData('DAX', 100);
  }

  // TODO Add doc to handleOpenPosition
  handleOpenPosition = () => {
    const { selectedMarket, newPosition } = this.props;
    this.props.onOpenPosition(selectedMarket, newPosition);
    ReactGA.event({
      category: 'Trading',
      action: 'New position opened',
      value: 1,
      label: 'New position',
    });
  };

  render() {
    const { classes, authenticated } = this.props;

    // console.log(this.constructor.name, '=>', this.props);
    return (
      <TradingViewContainer>
        <TradingModals />
        <TradingBanner>
          <Banner src={bannerImg} alt="banner" />
        </TradingBanner>
        {authenticated && <TradingChat />}
        {authenticated ? (
          <TradingContent>
            <TradingSection>
              <BoxTitle>
                <AccountBalanceIcon
                  color="secondary"
                  className={classes.titleIcon}
                />
                <h1 className={classes.h1}>Reto Real Trading 2019</h1>
              </BoxTitle>

              <Typography className={classes.h2} paragraph>
                La meta es conseguir 99.000€ en un año con una cuenta real de
                1.000€
              </Typography>

              <BoxTitle>
                <AccountBalanceWalletIcon
                  color="secondary"
                  className={classes.titleIcon}
                />
                <h1 className={classes.h1}>Objetivo diario 4,48%</h1>
              </BoxTitle>
              <Typography variant="caption" color="secondary">
                Profit Objetivo: <b>23,5 pips</b>
              </Typography>
              <Typography variant="caption" color="secondary" paragraph>
                Stop Loss: <b>10 pips</b>
              </Typography>
              <Separator />
              <Button
                onClick={this.handleMoreInfoClick}
                variant="contained"
                color="secondary"
                size="small"
              >
                Más información
              </Button>
            </TradingSection>
            <TradingSection>
              <Suspense fallback={<div>Loading...</div>}>
                <LazyTrades />
              </Suspense>
            </TradingSection>
            <TradingSection>
              <h1 className={classes.h1}>{literals.TRADING.title}</h1>
              <h2 className={classes.h2}>{literals.TRADING.subtitle}</h2>
              <Suspense fallback={<div>Loading...</div>}>
                <LazyPositions />
              </Suspense>
            </TradingSection>

            {/* {this.props.match.url === '/trading/trades' && <Trades />} */}
          </TradingContent>
        ) : (
          <ErrorContainer>
            <SecurityIcon style={{ fontSize: 60 }} />
            <h1>No tienes acceso para ver esta sección</h1>
            <Typography color="secondary">
              Accede para ver el contenido
            </Typography>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </ErrorContainer>
        )}
      </TradingViewContainer>
    );
  }
}

TradingView.propTypes = {
  selectedMarket: PropTypes.string.isRequired,
  newPosition: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default withStyles(styles)(TradingView);
