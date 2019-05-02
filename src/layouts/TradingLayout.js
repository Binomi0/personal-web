import React from 'react';
import { LoadingBar } from 'react-redux-loading-bar';

import Modals from '../routes/Trading/modals';
import AppBar from '../components/AppBar';

const TradingLayout = ({ children }) => {
  return (
    <div>
      <LoadingBar showFastActions />
      <Modals />
      <AppBar color="primary" title="Adolfo Onrubia" subtitle="Trading" />

      {children}
    </div>
  );
};

export default TradingLayout;
