import React from 'react';

import RouteWithLayout from './RouteWithLayout';

import Home from '../components/Home';
import MainLayout from '../layouts/MainLayout';
import TradingLayout from '../layouts/TradingLayout';
import PortfolioLayout from '../layouts/PortfolioLayout';

const Trading = React.lazy(() => import('./Trading'));
const Developer = React.lazy(() => import('./Developer'));
const Portfolio = React.lazy(() => import('./Portfolio'));
const Biography = React.lazy(() => import('./Biography'));


export default [
  <RouteWithLayout
    key="home"
    path="/"
    exact
    component={Home}
    layout={MainLayout}
  />,
  <RouteWithLayout
    key="trading"
    path="/trading*"
    exact
    component={Trading}
    layout={TradingLayout}
  />,
  <RouteWithLayout
    key="portfolio"
    path="/portfolio"
    exact
    component={Portfolio}
    layout={PortfolioLayout}
  />,
  <RouteWithLayout
    key="biography"
    path="/biography"
    exact
    component={Biography}
    layout={MainLayout}
  />,
  <RouteWithLayout
    key="developer"
    path="/developer"
    exact
    component={Developer}
    layout={MainLayout}
  />,
  <RouteWithLayout
    key="tools"
    path="/tools"
    exact
    component={Home}
    layout={MainLayout}
  />,
];
