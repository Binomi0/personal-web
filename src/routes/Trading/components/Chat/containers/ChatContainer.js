import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import ChatView from '../components/ChatView';
import styles from '../styles/chat';
import { actions as chatActions } from '../modules/chat';

const mapStateToProps = ({ user, chat }) => ({
  messages: chat.messages,
  user,
});

const mapDispatchToProps = { ...chatActions };

const StyledChat = withStyles(styles)(ChatView);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledChat);
