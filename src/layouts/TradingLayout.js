import React from 'react';
import { LoadingBar } from 'react-redux-loading-bar';

import Modals from '../routes/Trading/modals';
import AppBar from '../components/AppBar';
import Drawers from '../components/Drawer';
import Footer from '../components/Footer';

const TradingLayout = ({ children }) => {
  return (
    <div>
      <LoadingBar showFastActions />
      <Modals />
      <Drawers />
      <AppBar color="primary" title="Adolfo Onrubia" subtitle="Trading" />

      <div className="App">{children}</div>

      <Footer />
    </div>
  );
};

export default TradingLayout;
