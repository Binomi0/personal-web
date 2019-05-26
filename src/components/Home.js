import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import Contacto from './Contacto';

import '../containers/App.scss';
import { Snackbar, IconButton, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class Home extends Component {
  state = {
    snackOpen: false,
    authenticated: false,
  };

  componentDidMount() {
    ReactGA.pageview('/', [], 'Home');
    ReactGA.event({
      category: 'User',
      action: 'Navigates to home',
      value: 1,
      label: 'Visited HomePage',
      nonInteraction: true,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.authenticated !== nextState.authenticated) {
      this.setState({
        snackOpen: true,
        authenticated: nextProps.authenticated,
      });
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackOpen: false });
  };

  render() {
    const { classes, displayName } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snackOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'wellcome-message',
          }}
          message={
            <span id="wellcome-message">¡Bienvenido {displayName}!</span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <div className="App-Home">
          <div className="App-logo logo1" />
          <div className="App-logo logo2" />
          <div className="App-logo logo3" />
          <div className="App-logo logo4" />
          <h4>Adolfo J. Onrubia Albalá</h4>
          <p>Full Stack Developer</p>
          <p>Entrepreneur</p>
          <p>Trader</p>
        </div>
        <Contacto />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => ({
  authenticated: auth.authenticated,
  displayName: user.displayName,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Home));
