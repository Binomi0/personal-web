import React from 'react';
import { LoadingBar } from 'react-redux-loading-bar';

import Modals from '../routes/Trading/modals';
import AppBar from '../components/AppBar';
import Drawers from '../components/Drawer';

const TradingLayout = ({ children }) => {
  return (
    <div>
      <LoadingBar showFastActions />
      <Modals />
      <Drawers />
      <AppBar color="primary" title="Adolfo Onrubia" subtitle="Trading" />

      {children}
    </div>
  );
};

export default TradingLayout;
