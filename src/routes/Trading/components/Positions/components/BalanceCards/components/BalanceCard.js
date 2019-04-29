import React from 'react';
import PropTypes from 'prop-types';
import moment from '../../../../../../../config/moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactGA from 'react-ga';

import styles from '../styles/balanceCards'; // GraphContent,
import formatter from '../../../../../../../utils/formatAmount';
// import CandleStickChart from '../../../../../components/CandleStickChart';
// import { data } from '../modules/constants';

import { MARKETS } from '../../../../../modules/constants';

class BalanceCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    market: PropTypes.string.isRequired,
    equity: PropTypes.shape({
      mediumPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      quantity: PropTypes.number,
    }),
    prices: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    onSelectMarket: PropTypes.func.isRequired,
  };

  handleClosePosition = (market) => {
    this.props.onSelectMarket(market);
    this.props.openModal('EXIT_POSITION');
    // this.props.onExitPosition(market);
  };

  handleOpenPosition = (market) => {
    this.props.onSelectMarket(market);
    this.props.openModal('NEW_TRADE');
  };

  render() {
    const {
      classes,
      title,
      market,
      equity,
      prices,
      // onExitPosition,
    } = this.props;

    // console.log('market', market);
    const cryptoPrice =
      prices.coinbase[market] && prices.coinbase[market].amount;
    const indexPrice =
      prices.ig[MARKETS.IG[market]] && prices.ig[MARKETS.IG[market]].CURRENT;
    const bull = <span className={classes.bullet}>•</span>;

    const indexSpread =
      (prices.spread && prices.spread[MARKETS.IG[market]]) || 0;

    // console.log(this.constructor.name, this.props);
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {title} {bull} {market} {bull} <b>{cryptoPrice || indexPrice}</b>(
            {indexSpread})
          </Typography>
          {equity ? (
            <>
              <Typography
                variant="h5"
                component="h2"
                color={equity.amount > 0 ? 'textSecondary' : 'error'}
              >
                {equity.amount > 0 && '+ '}
                {equity.amount && formatter.format(equity.amount)}
              </Typography>
              <Typography color="textSecondary">
                {equity.direction === 'Long' ? 'Largo: ' : 'Corto: '}
                {equity.mediumPrice && equity.mediumPrice}{' '}
                {equity.quantity &&
                  `(${equity.quantity} contrato${
                    equity.quantity === '1' ? '' : 's'
                  })`}
              </Typography>
              <Typography className={classes.pos} variant="caption" paragraph>
                {equity.startTrade &&
                  moment(equity.startTrade).format(
                    'D [de] MMMM [de] YYYY [a las] HH:MM',
                  )}
              </Typography>
            </>
          ) : (
            <Typography component="h5" variant="h5">
              Cerrada
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {equity && equity.amount && (
            <Button
              onClick={() => this.handleClosePosition(market)}
              variant="contained"
              color="primary"
              size="small"
            >
              Cerrar Posición
            </Button>
          )}
          <Button
            onClick={() => this.handleOpenPosition(market)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Abrir Posición
          </Button>
        </CardActions>
        {/* {market === 'DOW' && (
          <CandleStickChart data={this.props.prices.charts.DOW || []} />
        )}
        {market === 'DAX' && (
          <CandleStickChart data={this.props.prices.charts.DAX || []} />
        )} */}
      </Card>
    );
  }
}

export default withStyles(styles)(BalanceCard);
