import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogActions } from '@material-ui/core';

import styles from '../styles/trades';

class TradesMoreInfo extends React.Component {
  handleCloseModal = () => {
    this.props.closeModal();
  };

  render() {
    const { closeModal, modalOpen } = this.props;

    // console.log(this.constructor.name, this.props);

    return (
      <Dialog
        onClose={closeModal}
        aria-labelledby="exit-position-dialog"
        open={modalOpen}
      >
        <DialogTitle id="exit-position-dialog">Balance Cuenta Real</DialogTitle>
        <DialogContent>
          <Typography>
            Este es el resultado obtenido en € durante el número de operaciones
            mostrado
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleCloseModal}
            variant="contained"
            color="primary"
          >
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TradesMoreInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
};

const TradesMoreInfoWrapped = withStyles(styles)(TradesMoreInfo);

export default TradesMoreInfoWrapped;
