import React from 'react';
import { LoadingBar } from 'react-redux-loading-bar';
import { connect } from 'react-redux';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from '../config/firebase';
import Modals from '../routes/Trading/modals';
import AppBar from '../components/AppBar';
import Drawers from '../components/Drawer';
import Footer from '../components/Footer';

import { actions as userActions } from '../reducers/user';

console.log('firebase', firebase);
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};
class TradingLayout extends React.Component {
  componentDidMount() {
    console.log('process.env.GCLOUD_PROJECT', process.env.GCLOUD_PROJECT);
    console.log('process.env.FIREBASE_CONFIG', process.env.FIREBASE_CONFIG);
    this.props.getUser();
  }

  render() {
    const { children, user } = this.props;
    console.log('user', user);
    return (
      <div>
        <LoadingBar showFastActions />
        <Modals />
        <Drawers />
        <AppBar
          user={user}
          color="primary"
          title="Adolfo Onrubia"
          subtitle="Trading"
        />
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />

        <div className="App">{children}</div>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = { ...userActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradingLayout);
