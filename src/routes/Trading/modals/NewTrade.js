import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import styles from '../styles/trading';

class SelectMarket extends React.Component {
  state = {
    enterPrice: 11234,
    direction: 'Long',
    quantity: 1,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClose = () => {
    this.props.onClose(this.state);
  };

  render() {
    const { classes, onClose, selectedMarket, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          Abriendo posición en {this.props.selectedMarket}
        </DialogTitle>
        <div className={classes.container}>
          <FormControl className={classes.formControl} variant="filled">
            <InputLabel htmlFor="enterPrice">Precio Entrada</InputLabel>
            <Input
              id="enterPrice"
              name="enterPrice"
              value={this.state.enterPrice}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl} variant="filled">
            <InputLabel htmlFor="direction">Dirección</InputLabel>
            <Input
              id="direction"
              name="direction"
              value={this.state.direction}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl} variant="filled">
            <InputLabel htmlFor="quantity">Cantidad</InputLabel>
            <Input
              id="quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </FormControl>
          <Button onClick={this.handleClose} variant="contained">
            Enviar
          </Button>
        </div>
      </Dialog>
    );
  }
}

SelectMarket.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedMarket: PropTypes.string,
};

const SelectMarketWrapped = withStyles(styles)(SelectMarket);

export default SelectMarketWrapped;
