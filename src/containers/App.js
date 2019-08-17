import React, { memo, useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { connect } from 'react-redux';

import RouteWithLayout from '../routes/RouteWithLayout';
import MainLayout from '../layouts/MainLayout';
import TradingLayout from '../layouts/TradingLayout';
import PortfolioLayout from '../layouts/PortfolioLayout';

import Home from '../components/Home';
import Trading from '../routes/Trading';
import Developer from '../routes/Developer';
import Portfolio from '../routes/Portfolio';
import Biography from '../routes/Biography';
import './App.scss';

import { checkUser } from '../reducers/auth';
import './App.scss';

const App = memo(function App({ dispatch }) {
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={LoadingBar}>
        <RouteWithLayout path="/" exact component={Home} layout={MainLayout} />
        <RouteWithLayout
          path="/trading*"
          exact
          component={Trading}
          layout={TradingLayout}
        />
        <RouteWithLayout
          path="/portfolio"
          exact
          component={Portfolio}
          layout={PortfolioLayout}
        />
        <RouteWithLayout
          path="/developer"
          exact
          component={Developer}
          layout={MainLayout}
        />
        <RouteWithLayout
          path="/tools"
          exact
          component={Home}
          layout={MainLayout}
        />
        <RouteWithLayout
          path="/biography"
          exact
          component={Biography}
          layout={MainLayout}
        />
      </Suspense>
    </Router>
  );
});

export default connect()(App);
