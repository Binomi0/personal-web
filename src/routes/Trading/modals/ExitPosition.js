import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { DialogActions } from '@material-ui/core';

import styles from '../styles/trading';
import { MARKETS } from '../modules/constants';

class ExitPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exitPrice: props.ig[MARKETS.IG[props.selectedMarket]].BID,
      quantity: 1,
      direction: 'Long',
    };
  }

  componentDidMount() {
    const positions = this.props.positions.filter(
      (pos) => pos.market === this.props.selectedMarket,
    );

    const quantity = positions.reduce((total, pos) => total + pos.quantity, 0);
    if (positions[0].direction !== 'Long') {
      this.setState({
        exitPrice: this.props.ig[MARKETS.IG[this.props.selectedMarket]].OFFER,
      });
    }

    this.setState({ direction: positions[0].direction, quantity });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: parseFloat(value) });
  };

  handleOnExitPosition = () => {
    this.props.onExitPosition(this.props.selectedMarket, this.state);
    this.handleClose();
  };

  handleClose = () => {
    this.props.closeModal();
  };

  render() {
    const { classes, closeModal, open } = this.props;

    // console.log(this.constructor.name, this.props);

    return (
      <Dialog
        onClose={closeModal}
        aria-labelledby="exit-position-dialog"
        open={open}
      >
        <DialogTitle id="exit-position-dialog">Cerrando posición</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl} variant="filled">
            <InputLabel htmlFor="exitPrice">Precio Salida</InputLabel>
            <Input
              type="number"
              id="exitPrice"
              name="exitPrice"
              value={this.state.exitPrice}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl} variant="filled">
            <InputLabel htmlFor="quantity">Contratos</InputLabel>
            <Input
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
            onClick={this.handleOnExitPosition}
            variant="contained"
            color="primary"
          >
            cerrar posición
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ExitPosition.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  onExitPosition: PropTypes.func.isRequired,
  selectedMarket: PropTypes.string.isRequired,
};

const ExitPositionWrapped = withStyles(styles)(ExitPosition);

export default ExitPositionWrapped;
