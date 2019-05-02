import React from 'react';
import { LoadingBar } from 'react-redux-loading-bar';
import AppBar from '../components/AppBar';

import Modals from '../routes/Trading/modals';

const PortfolioLayout = ({ children }) => {
  return (
    <div>
      <LoadingBar showFastActions />
      <Modals />

      <AppBar color="primary" title="Adolfo Onrubia" subtitle="Portfolio" />

      {children}
    </div>
  );
};

export default PortfolioLayout;
