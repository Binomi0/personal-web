import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from '../../styles/balanceCards';

function BalanceCards(props) {
  const { classes, title, market, balance } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title} {bull} {market}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color={balance > 0 ? 'textSecondary' : 'error'}
        >
          {balance} €
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          En Mercado -
        </Typography>
        <Typography component="p">
          Patrón detectado ABCD
          <br />
          entrando en pull-back
          <br />
          al toque a la media móvil
          <br />
          de 20 períodos
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="small">
          Cerrar Posición
        </Button>
      </CardActions>
    </Card>
  );
}

BalanceCards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BalanceCards);
