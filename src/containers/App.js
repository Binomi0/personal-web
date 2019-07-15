import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import routes from '../routes/routes';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<LoadingBar />}>{routes}</Suspense>
      </Router>
    );
  }
}

export default App;
