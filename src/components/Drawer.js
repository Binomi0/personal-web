import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';

import { actions as drawerActions } from '../reducers/drawer';

import styles from './styles';

class TradingDrawer extends React.Component {
  render() {
    const { classes, closeDrawer, openDrawer } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {['Perfil', 'Opciones'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <FaceIcon /> : <SettingsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Posiciones', 'Histórico'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <AccountBalanceIcon /> : <AssignmentIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Home', 'Trading', 'Portfolio'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    return (
      <div>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          anchor="right"
          open={this.props.open}
          onOpen={openDrawer}
          onClose={closeDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

TradingDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TradingDrawerWrapped = withStyles(styles)(TradingDrawer);

const mapStateToProps = ({ drawer }) => ({
  open: drawer.open,
});

const mapDispatchToProps = { ...drawerActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradingDrawerWrapped);
