import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import RouteWithLayout from '../routes/RouteWithLayout';
import MainLayout from '../layouts/MainLayout';
import TradingLayout from '../layouts/TradingLayout';
import PortfolioLayout from '../layouts/PortfolioLayout';
import './App.scss';

const Home = React.lazy(() => import('../components/Home'));
const Trading = React.lazy(() => import('../routes/Trading'));
const Frontend = React.lazy(() => import('../routes/Frontend'));
const Backend = React.lazy(() => import('../routes/Backend'));
const Portfolio = React.lazy(() => import('../routes/Portfolio'));

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<LoadingBar />}>
          <RouteWithLayout
            path="/"
            exact
            component={Home}
            layout={MainLayout}
          />
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
            path="/frontend"
            exact
            component={Frontend}
            layout={MainLayout}
          />
          <RouteWithLayout
            path="/backend"
            exact
            component={Backend}
            layout={MainLayout}
          />
          <RouteWithLayout
            path="/tools"
            exact
            component={Home}
            layout={MainLayout}
          />
        </Suspense>
      </Router>
    );
  }
}

export default App;
