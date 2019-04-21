import React from 'react';
import PropTypes from 'prop-types';
import moment from '../../../../../config/moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from '../styles/balanceCards'; // GraphContent,
import formatter from '../../../../../utils/formatAmount';
// import CandleStickChart from '../../../../../components/CandleStickChart';
// import { data } from '../modules/constants';

class BalanceCard extends React.Component {
  handleClosePosition = (market) => {
    console.log('Market =>', market);

    this.props.openModal('EXIT_POSITION');
    this.props.onSelectMarket(market);
    // this.props.onExitPosition(market);
  };
  render() {
    const {
      classes,
      title,
      market,
      balance,
      prices,
      // onExitPosition,
    } = this.props;

    const crypto = prices.coinbase[market] && prices.coinbase[market].amount;
    const index = prices.ig[market] && prices.ig[market].bid;
    const bull = <span className={classes.bullet}>•</span>;

    // console.log('data =>', this.props.prices.charts[market]);
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {title} {bull} {market} {bull} <b>{crypto || index}</b>
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color={balance.amount > 0 ? 'textSecondary' : 'error'}
          >
            {balance.amount > 0 && '+ '}
            {balance.amount && formatter.format(balance.amount)}
          </Typography>
          <Typography color="textSecondary">
            {balance.mediumPrice ? 'Posición: ' : 'Cerrada'}
            {balance.mediumPrice && balance.mediumPrice}{' '}
            {balance.openContracts &&
              `(${balance.openContracts} contrato${
                balance.openContracts === 1 ? '' : 's'
              })`}
          </Typography>
          <Typography className={classes.pos} variant="caption" paragraph>
            {balance.startTrade &&
              moment(balance.startTrade).format(
                'D [de] MMMM [de] YYYY [a las] HH:MM',
              )}
          </Typography>
        </CardContent>
        {/* {market === 'DOW' && (
          <CandleStickChart data={this.props.prices.charts.DOW || []} />
        )}
        {market === 'DAX' && (
          <CandleStickChart data={this.props.prices.charts.DAX || []} />
        )} */}
        <CardActions>
          <Button
            onClick={() => this.handleClosePosition(market)}
            variant="contained"
            color="primary"
            size="small"
          >
            Cerrar Posición
          </Button>
        </CardActions>
      </Card>
    );
  }
}

BalanceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  market: PropTypes.string.isRequired,
  balance: PropTypes.shape({
    mediumPrice: PropTypes.number,
    amount: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  prices: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default withStyles(styles)(BalanceCard);
