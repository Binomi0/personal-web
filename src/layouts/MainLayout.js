import React, { Component } from 'react';
import { LoadingBar } from 'react-redux-loading-bar';

export default class MainLayout extends Component {
  render() {
    return (
      <div>
        <LoadingBar showFastActions />
        {this.props.children}
      </div>
    );
  }
}
