import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from '../styles/trading';
import { Typography, Button } from '@material-ui/core';

class PositionTable extends Component {
  handleClose = () => {
    this.props.exitPosition(this.props.market);
  };

  render() {
    const isAdmin = Boolean(localStorage.getItem('isAdmin'));
    const { classes, position, market } = this.props;
    if (position) {
      return (
        <Paper className={classes.table.root}>
          <div style={{ margin: '1.5rem 1rem' }}>
            <Typography variant="h2">{market}</Typography>
          </div>
          <Table className={classes.table.table}>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Precio Entrada</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right">Dirección</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                {isAdmin && <TableCell align="right">Cerrar</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {moment(position.date).format(
                    '[Abierta el] DD/MM/YYYY [a las] HH:MM:SS',
                  )}
                </TableCell>
                <TableCell align="right">{position.enterPrice}</TableCell>
                <TableCell align="right">
                  {position.status || 'Abierta'}
                </TableCell>
                <TableCell align="right">{position.direction}</TableCell>
                <TableCell align="right">{position.quantity}</TableCell>
                {isAdmin && (
                  <TableCell align="right">
                    <Button
                      onClick={this.handleClose}
                      variant="contained"
                      color="secondary"
                    >
                      <Typography variant="body1">x</Typography>
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      );
    } else {
      return 'Cargando Datos...';
    }
  }
}

PositionTable.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
};

export default withStyles(styles)(PositionTable);
