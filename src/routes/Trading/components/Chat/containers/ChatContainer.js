import { connect } from 'react-redux';
import io from 'socket.io-client';
import { withStyles } from '@material-ui/core';

import ChatView from '../components/ChatView';
import styles from '../styles/chat';

const socket = io.connect(process.env.REACT_APP_SOCKET_HOST, {
  forceNew: true,
});

const mapStateToProps = ({ user }) => ({
  user,
  socket,
});

const mapDispatchToProps = {};

const StyledChat = withStyles(styles)(ChatView);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledChat);
