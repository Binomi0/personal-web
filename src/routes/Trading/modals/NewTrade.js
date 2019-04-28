import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import styles from '../styles/trading';

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

  componentWillReceiveProps(nextProps, nextState) {
    const { BID, OFFER } = nextProps.ig[MARKETS[nextProps.selectedMarket]];

    if (nextState.direction === 'Long') {
      if (OFFER !== nextState.enterPrice) {
        this.setState({ enterPrice: OFFER });
      }
    } else {
      if (BID !== nextState.enterPrice) {
        this.setState({ enterPrice: BID });
      }
    }
  }

  handleChangeDirection = ({ target: { value: direction } }) => {
    this.setState({ direction }, this.updateEnterPrice);
  };

  updateEnterPrice = () => {
    const { direction } = this.state;
    const { BID, OFFER } = this.props.ig[MARKETS[this.props.selectedMarket]];

    if (direction === 'Long') {
      this.setState({ enterPrice: OFFER });
    } else {
      this.setState({ enterPrice: BID });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    if (name === 'direction' && this.state.direction !== value) {
      this.setState({});
    }
    this.setState({ [name]: value });
    this.setCurrentPrice();
  };

  setCurrentPrice = () => {};

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
            <InputLabel htmlFor="quantity">Cantidad</InputLabel>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </FormControl>
          <Button
            color="primary"
            onClick={this.handleOpenNewPosition}
            variant="contained"
          >
            Enviar
          </Button>
        </div>
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
