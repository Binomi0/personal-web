import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Trading from '../routes/Trading';
import Home from '../components/Home';

import './App.scss';

class App extends Component {
  render() {
    console.log('this.props', this.props);
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/trading" exact component={Trading} />
        <Route path="/frontend" exact component={Home} />
        <Route path="/backend" exact component={Home} />
        <Route path="/tools" exact component={Home} />
      </Router>
    );
  }
}

export default App;
