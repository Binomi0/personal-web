import React, { Component } from 'react';
import ReactGA from 'react-ga';

// import FrontEnd from './FrontEnd';
// import BackEnd from './Backend';
// import Tools from './Tools';
import Contacto from './Contacto';
import Footer from './Footer';
import Menu from './Menu';

import '../containers/App.scss';

class Home extends Component {
  componentDidMount() {
    console.log('enviando vista y eveny');

    ReactGA.pageview('/home', [], 'Home');
    ReactGA.event({
      category: 'User',
      action: 'Navigates to home',
      value: 1,
      label: 'Visited HomePage',
      nonInteraction: true,
    });
  }

  render() {
    // console.log('this.props', this.props);
    return (
      <div className="App-Home">
        <Menu />
        <div className="App-logo logo1" />
        <div className="App-logo logo2" />
        <div className="App-logo logo3" />
        <div className="App-logo logo4" />
        <h4>Adolfo J. Onrubia Albalá</h4>
        <p>Full Stack Developer</p>
        <p>Entrepreneur</p>
        <p>Trader</p>
        <Contacto />

        <Footer />
      </div>
    );
  }
}

export default Home;
