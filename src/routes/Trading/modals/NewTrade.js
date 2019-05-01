import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import styles from '../styles/trading';
import { DialogContent, DialogActions } from '@material-ui/core';

const MARKETS = {
  DOW: 'IX.D.DOW.IFS.IP',
  DAX: 'IX.D.DAX.IFS.IP',
};

class NewTrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterPrice: props.ig[MARKETS[props.selectedMarket]].OFFER,
      direction: 'Long',
      quantity: 1,
    };
  }

  handleChangeDirection = ({ target: { value: direction } }) => {
    this.setState({ direction });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleOpenNewPosition = () => {
    this.handleClose();
    this.props.onOpenPosition(this.props.selectedMarket, this.state);
  };

  handleClose = () => {
    this.props.closeModal();
  };

  render() {
    const { classes, open } = this.props;

    // console.log('other =>', other);

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="new-trade-dialog"
        open={open}
      >
        <DialogTitle id="new-trade-dialog">
          Abriendo posición en {this.props.selectedMarket}
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl} variant="filled">
            <TextField
              autoFocus
              label="Precio Entrada"
              id="enterPrice"
              name="enterPrice"
              value={this.state.enterPrice}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="direction">Dirección</InputLabel>
            <Select
              value={this.state.direction}
              onChange={this.handleChangeDirection}
              inputProps={{
                name: 'direction',
                id: 'direction',
              }}
            >
              <MenuItem value="Long">Largo</MenuItem>
              <MenuItem value="Short">Corto</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} variant="filled">
            <TextField
              label="Cantidad"
              type="number"
              id="quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={this.handleOpenNewPosition}
            variant="contained"
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewTrade.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  onOpenPosition: PropTypes.func.isRequired,
  selectedMarket: PropTypes.string.isRequired,
  ig: PropTypes.object.isRequired,
};

const NewTradeWrapped = withStyles(styles)(NewTrade);

export default NewTradeWrapped;
