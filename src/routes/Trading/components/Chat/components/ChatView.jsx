/* eslint-disable react/jsx-no-duplicate-props */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  TextField,
  CardHeader,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import KeyboardArrowRigthIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import OnIcon from '@material-ui/icons/Chat';
import OffIcon from '@material-ui/icons/ChatBubble';

import { StyledChat, StyledItems, StyledName } from '../styles/chat';

export default class ChatView extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    initChatSocket: PropTypes.func.isRequired,
    chatActive: PropTypes.bool.isRequired,
  };

  state = {
    message: {
      text: '',
    },
  };

  handleActiveChat = (activeChat) => {
    this.props.initChatSocket(this.props.user);
    this.props.toogleChat(activeChat);
  };

  handleChange = (e) => {
    this.setState({ message: { ...this.state.message, text: e.target.value } });
  };

  handleSubmit = () => {
    const { text } = this.state.message;
    const { user } = this.props;

    if (text && user._id) {
      this.props.newMessage({ text, user });
      this.setState({ message: { text: '' } });
    }
  };

  render() {
    const { classes, chatActive } = this.props;
    const renderMessages = this.props.messages.map((message, index) => (
      <ListItem key={index} className={classes.listItem}>
        <StyledItems>
          <StyledName>
            <Typography
              noWrap
              color="secondary"
              variant="body2"
              className={classes.name}
            >
              {message.author.username || message.author.displayName}
            </Typography>
            <Typography
              noWrap
              color="secondary"
              variant="body1"
              className={classes.date}
            >
              {moment(message.createdAt).format('HH:MM[h]')}
            </Typography>
          </StyledName>
          <KeyboardArrowRigthIcon color="secondary" />
          <Typography
            color="secondary"
            variant="body1"
            className={classes.message}
          >
            {message.text}
          </Typography>
        </StyledItems>
      </ListItem>
    ));

    return (
      <StyledChat className={classes.card}>
        <CardHeader
          action={
            chatActive ? (
              <OnIcon
                className={classes.cardIcon}
                fontSize="large"
                color="primary"
                onClick={() => this.handleActiveChat(false)}
              />
            ) : (
              <OffIcon
                className={classes.cardIcon}
                fontSize="large"
                color="primary"
                onClick={() => this.handleActiveChat(true)}
              />
            )
          }
          title="¿Hablamos?"
          subheader="Puedes dejarme un mensaje a continuación..."
        />
        <CardContent className={classes.cardContent}>
          {chatActive && <List>{renderMessages}</List>}
        </CardContent>
        {chatActive && (
          <CardContent>
            <TextField
              type="textarea"
              inputProps={{ maxLength: 255 }}
              InputProps={{
                endAdornment: (
                  <KeyboardReturnIcon
                    className={classes.inputIcon}
                    onClick={this.handleSubmit}
                  />
                ),
              }}
              label="Escribe tu mensaje"
              autoFocus
              fullWidth
              multiline
              value={this.state.message.text}
              onChange={this.handleChange}
              helperText="Max 255 caracteres"
            />
          </CardContent>
        )}
      </StyledChat>
    );
  }
}
