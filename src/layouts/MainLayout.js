import React, { Component } from 'react';
import { LoadingBar } from 'react-redux-loading-bar';

import Menu from '../components/Menu';
import HomeFooter from '../components/HomeFooter';
import { MainLayoutStyled } from './styles';

export default class MainLayout extends Component {
  render() {
    return (
      <MainLayoutStyled>
        <Menu />
        <LoadingBar showFastActions />

        {this.props.children}

        <HomeFooter />
      </MainLayoutStyled>
    );
  }
}
