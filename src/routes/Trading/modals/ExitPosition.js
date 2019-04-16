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

class ExitPosition extends React.Component {
  state = {
    exitPrice: 11234,
    quantity: 1,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: parseFloat(value) });
  };

  handleClose = () => {
    this.props.onClose(this.state);
  };

  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="exit-position-dialog"
        {...other}
      >
        <DialogTitle id="exit-position-dialog">Cerrando posición</DialogTitle>
        <div className={classes.container}>
          <FormControl className={classes.formControl} variant="filled">
            <InputLabel htmlFor="exitPrice">Precio Salida</InputLabel>
            <Input
              id="exitPrice"
              name="exitPrice"
              value={this.state.exitPrice}
              onChange={this.handleChange}
            />
          </FormControl>
          <Button
            onClick={this.handleClose}
            variant="contained"
            color="primary"
          >
            Enviar
          </Button>
        </div>
      </Dialog>
    );
  }
}

ExitPosition.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ExitPositionWrapped = withStyles(styles)(ExitPosition);

export default ExitPositionWrapped;
