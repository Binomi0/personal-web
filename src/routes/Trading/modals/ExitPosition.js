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

const MARKETS = {
  DOW: 'IX.D.DOW.IFS.IP',
  DAX: 'IX.D.DAX.IFS.IP',
};

// const defaultState = {
//   exitPrice: 11234,
//   quantity: 1,
// };

class ExitPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exitPrice: props.liveStream[MARKETS[props.selectedMarket]].OFFER,
      quantity: 1,
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { OFFER } = nextProps.liveStream[MARKETS[nextProps.selectedMarket]];
    if (OFFER !== nextState.exitPrice) {
      this.setState({ exitPrice: OFFER });
    }
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
    const {
      classes,
      closeModal,
      open,
      // liveStream,
      // selectedMarket,
    } = this.props;

    // const exitPrice = liveStream[MARKETS[selectedMarket]].OFFER;
    // console.log(exitPrice);
    console.log(this.constructor.name, this.props);

    return (
      <Dialog
        onClose={closeModal}
        aria-labelledby="exit-position-dialog"
        open={open}
      >
        <DialogTitle id="exit-position-dialog">Cerrando posición</DialogTitle>
        <div className={classes.container}>
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
          <Button
            onClick={this.handleOnExitPosition}
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
  closeModal: PropTypes.func.isRequired,
  onExitPosition: PropTypes.func.isRequired,
  selectedMarket: PropTypes.string.isRequired,
};

const ExitPositionWrapped = withStyles(styles)(ExitPosition);

export default ExitPositionWrapped;
