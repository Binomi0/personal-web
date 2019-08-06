import React, { memo, useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { connect } from 'react-redux';

import { checkUser } from '../reducers/auth';
import routes from '../routes/routes';
import './App.scss';

const App = memo(function App({ dispatch }) {
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<LoadingBar />}>{routes}</Suspense>
    </Router>
  );
});

export default connect()(App);
