import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  DialogActions,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Separator from '../../../components/Separator';

const styles = (theme) => ({
  formControl: {
    marginRight: '1rem',
    '&:last-child': {
      marginRight: 0,
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  sendButton: {
    alignSelf: 'flex-end',
  },
});

class AddUser extends React.Component {
  state = {
    username: '',
    password: '',
    formCompleted: false,
    showPassword: false,
  };

  handleClose = () => {
    this.props.closeModal();
  };

  handleChange = (item) => (event) => {
    this.setState({ [item]: event.target.value }, this.validateForm);
  };

  handleSubmit = (form) => {
    form.preventDefault();
    this.props.logIn(this.state);
  };

  handleClickShowPassword = () => {
    console.log('handleClickShowPassword');

    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  validateForm = () => {
    if (!this.state.username || !this.state.password) {
      this.setState({ formCompleted: false });
      return;
    }
    this.setState({ formCompleted: true });
  };

  render() {
    const { classes, closeModal, open } = this.props;

    // console.log(this.constructor.name, this.props);

    return (
      <Dialog
        onClose={closeModal}
        aria-labelledby="add-user-dialog"
        open={open}
      >
        <DialogTitle id="add-user-dialog">
          Crea tu cuenta en BinoTrading
        </DialogTitle>
        <DialogContent>
          <Typography>Creando tu cuenta podras:</Typography>
          <Typography variant="caption">
            Añadir tus posiciones en el mercado y tener un seguimiento de ellas,
            y además, también podrás añadir tus operaciones realizadas y guardar
            tu track record.
          </Typography>
          <Separator />
          <Typography variant="h6">
            Introduce tus datos si te parece bien
          </Typography>
          <form className={classes.container} noValidate autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="username">Email</InputLabel>
              <Input
                fullWidth
                type="username"
                id="username"
                name="username"
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleChange('username')}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                fullWidth
                type={this.state.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!this.state.formCompleted}
            onClick={this.handleSubmit}
            type="submit"
            className={classes.sendButton}
          >
            Registrarme
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
};

const AddUserWrapped = withStyles(styles)(AddUser);

export default AddUserWrapped;
