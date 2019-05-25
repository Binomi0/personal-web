import React, { Component } from 'react';

import Menu from '../../../components/Menu';

export default class DeveloperView extends Component {
  render() {
    return (
      <div>
        <Menu />

        <div className="App-Home">
          <div className="App-logo logo1" />
          <div className="App-logo logo2" />
          <div className="App-logo logo3" />
          <div className="App-logo logo4" />
          <h4>Adolfo J. Onrubia Albalá</h4>
          <p>FrontEnd ReactJS</p>
          <p>Backend NodeJS</p>
        </div>
      </div>
    );
  }
}
