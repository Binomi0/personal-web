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

import { StyledChat, StyledItems, StyledName } from '../styles/chat';

export default class ChatView extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    initChatSocket: PropTypes.func.isRequired,
  };

  state = {
    message: {
      text: '',
    },
  };

  componentDidMount() {
    this.initChatSocket();
  }

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

  initChatSocket = () => {
    this.props.initChatSocket();
  };

  render() {
    const { classes } = this.props;
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
        <CardHeader title="Chat en vivo" />
        <CardContent className={classes.cardContent}>
          <List>{renderMessages}</List>
        </CardContent>
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
      </StyledChat>
    );
  }
}
