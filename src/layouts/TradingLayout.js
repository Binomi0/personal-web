import React from 'react';
import { LoadingBar } from 'react-redux-loading-bar';
import { connect } from 'react-redux';

// import firebase from '../config/firebase';
import Modals from '../routes/Trading/modals';
import AppBar from '../components/AppBar';
import Drawers from '../components/Drawer';
import Footer from '../components/Footer';

import { actions as userActions } from '../reducers/user';
import { actions as authActions } from '../reducers/auth';

class TradingLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <LoadingBar showFastActions />
        <Modals />
        <Drawers />
        <AppBar
          {...this.props}
          color="primary"
          title="Adolfo Onrubia"
          subtitle="Trading"
        />

        <div className="App">{children}</div>

        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = { ...userActions, ...authActions };

export default connect(
  null,
  mapDispatchToProps,
)(TradingLayout);
