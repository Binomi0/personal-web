import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from '../components/Home';
import Trading from '../routes/Trading';
import Frontend from '../routes/Frontend';
import Backend from '../routes/Backend';
import Portfolio from '../routes/Portfolio';
import RouteWithLayout from '../routes/RouteWithLayout';
import MainLayout from '../layouts/MainLayout';
import TradingLayout from '../layouts/TradingLayout';
import PortfolioLayout from '../layouts/PortfolioLayout';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
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
      </Router>
    );
  }
}

export default App;
