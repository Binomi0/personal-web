import React from 'react';

import RouteWithLayout from './RouteWithLayout';
import Home from '../components/Home';
import MainLayout from '../layouts/MainLayout';
import TradingLayout from '../layouts/TradingLayout';
import PortfolioLayout from '../layouts/PortfolioLayout';

const Trading = React.lazy(() => import('./Trading'));
const Frontend = React.lazy(() => import('./Frontend'));
const Backend = React.lazy(() => import('./Backend'));
const Portfolio = React.lazy(() => import('./Portfolio'));

export default [
  <RouteWithLayout path="/" exact component={Home} layout={MainLayout} />,
  <RouteWithLayout
    path="/trading*"
    exact
    component={Trading}
    layout={TradingLayout}
  />,
  <RouteWithLayout
    path="/portfolio"
    exact
    component={Portfolio}
    layout={PortfolioLayout}
  />,
  <RouteWithLayout
    path="/frontend"
    exact
    component={Frontend}
    layout={MainLayout}
  />,
  <RouteWithLayout
    path="/backend"
    exact
    component={Backend}
    layout={MainLayout}
  />,
  <RouteWithLayout path="/tools" exact component={Home} layout={MainLayout} />,
];
