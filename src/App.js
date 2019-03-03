import React, { Component } from 'react';

import FrontEnd from './components/FrontEnd';
import BackEnd from './components/Backend';
import Tools from './components/Tools';
import Contacto from './components/Contacto';

import { Content } from './styles';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo logo1" />
          <div className="App-logo logo2" />
          <div className="App-logo logo3" />
          <div className="App-logo logo4" />
          <h4>Adolfo J. Onrubia Albalá</h4>
          <p>Full Stack Developer</p>
          <Contacto />
          <Content>
            <FrontEnd>Frontend</FrontEnd>
            <BackEnd>Backend</BackEnd>
            <Tools>Tools</Tools>
          </Content>
        </header>
      </div>
    );
  }
}

export default App;
