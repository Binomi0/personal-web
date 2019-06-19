import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Analitycs from '../../../utils/analitycs/google-analitycs';

export default class BiographyView extends Component {
  componentDidMount() {
    Analitycs.pageview('/biography', 'Biografía');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.biography}>
        <Typography color="secondary">
          Nací en Madrid el 26 de Marzo de 1978
        </Typography>
        <Typography color="secondary" paragraph variant="h6">
          Desde pequeño me apasionaba la tecnología, recuerdo tener alrededor de
          8 o 9 años y fascinarme un monitor verde con letritas...
        </Typography>
        <Typography color="secondary">To be continued...</Typography>
      </div>
    );
  }
}
