import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import blue from '@material-ui/core/colors/blue';

const products = ['DAX', 'DOW', 'ETH'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SelectMarket extends React.Component {
  handleSelectMarketClick = (value) => {
    this.handleClose();
    this.props.onSelectMarket(value);
    this.props.openModal('NEW_TRADE');
  };

  handleClose = () => {
    this.props.closeModal();
  };

  render() {
    const { classes, closeModal, open } = this.props;

    console.log(this.constructor.name, this.props);

    return (
      <Dialog
        onClose={closeModal}
        aria-labelledby="select-market-dialog"
        open={open}
      >
        <DialogTitle id="select-market-dialog">Selecciona activo</DialogTitle>
        <div>
          <List>
            {products.map((product) => (
              <ListItem
                button
                onClick={() => this.handleSelectMarketClick(product)}
                key={product}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={product} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SelectMarket.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  onSelectMarket: PropTypes.func.isRequired,
};

const SelectMarketWrapped = withStyles(styles)(SelectMarket);

export default SelectMarketWrapped;
