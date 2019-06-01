import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import ExitIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChatIconClose from '@material-ui/icons/ChatBubble';
import ChatIconOpen from '@material-ui/icons/Chat';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';

import { actions as drawerActions } from '../reducers/drawer';
import { actions as authActions } from '../reducers/auth';
import { actions as chatActions } from '../routes/Trading/components/Chat/modules/chat';

import styles from './styles';

class TradingDrawer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    chatActive: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired,
  };

  handleExitApp = () => {
    this.props.logOut();
  };

  toogleChat = () => {
    this.props.toogleChat(!this.props.chatActive);
  };

  render() {
    const { classes, closeDrawer, openDrawer, user, chatActive } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button>
            <Avatar src={user.photoURL} />
            <ListItemText primary={user.displayName} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {['Posiciones', 'Histórico'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <AccountBalanceIcon /> : <AssignmentIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
              <SettingsIcon />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/portfolio" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="PortFolio" />
            </ListItem>
          </Link>
          <ListItem button onClick={this.toogleChat}>
            <ListItemIcon>
              {chatActive ? <ChatIconClose /> : <ChatIconOpen />}
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.handleExitApp}>
            <ListItemIcon>
              <ExitIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItem>
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

const TradingDrawerWrapped = withStyles(styles)(TradingDrawer);

const mapStateToProps = ({ drawer, user, chat }) => ({
  open: drawer.open,
  user,
  chatActive: chat.chatActive,
});

const mapDispatchToProps = { ...drawerActions, ...authActions, ...chatActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradingDrawerWrapped);
