import { connect } from 'react-redux';
import { withStyles, withWidth } from '@material-ui/core';

import ChatView from '../components/ChatView';
import styles from '../styles/chat';
import { actions as chatActions } from '../modules/chat';

const mapStateToProps = ({ user, chat }) => ({
  messages: chat.messages,
  chatActive: chat.chatActive,
  user,
});

const mapDispatchToProps = { ...chatActions };

const StyledChat = withStyles(styles)(withWidth()(ChatView));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledChat);
