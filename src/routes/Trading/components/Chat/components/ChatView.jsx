import React, { Component } from 'react';
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
  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.state = {
      message: {
        author: 'Invitado',
        text: '',
      },
      messages: [],
    };
  }

  componentDidMount() {
    this.initSocketChat();
  }

  handleChange = (e) => {
    this.setState({ message: { ...this.state.message, text: e.target.value } });
  };

  handleSubmit = () => {
    if (this.state.message.text) {
      this.socket.emit('new-message', {
        text: this.state.message.text,
        author: this.props.user._id,
      });
      this.setState({ message: { text: '' } });
    }
  };

  initSocketChat = () => {
    this.socket.on('nuevo-mensaje', (message) => {
      console.log('message', message);
      this.setState({ messages: [message, ...this.state.messages] });
    });

    this.socket.on('messages', (messages) => {
      this.setState({ messages });
    });
  };

  render() {
    const { classes } = this.props;
    const renderMessages = this.state.messages.map((message, index) => (
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
