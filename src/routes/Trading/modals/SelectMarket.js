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
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';

const products = ['DAX', 'US30', 'ETH'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SelectMarket extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedMarket);
  };

  handleListItemClick = (value) => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedMarket, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Selecciona activo</DialogTitle>
        <div>
          <List>
            {products.map((product) => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(product)}
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
            <ListItem
              button
              onClick={() => this.handleListItemClick('addAccount')}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
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
