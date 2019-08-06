import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import createStore from './redux/create-store';
import './index.scss';
import theme from './styles/theme';
import { NEW_APP_AVAILABLE } from './action-types';

Sentry.init({
  dsn: 'https://05713da31a7b46d3b307f4e51812727e@sentry.io/1504948',
});

if (process.env.NODE_ENV === 'development') {
  console.log('process.env =>', process.env);
  // ReactGA.initialize(process.env.REACT_APP_GA_ID, { debug: true });
} else {
  // Analytics
  ReactGA.initialize(process.env.REACT_APP_GA_ID);
}

let userId = localStorage.getItem('userId');
if (!userId) {
  userId = 'Invitado';
}
ReactGA.ga('set', 'userId', userId);

const store = createStore();

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App store={store} />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

const config = {
  onUpdate(registration) {
    store.dispatch({ type: NEW_APP_AVAILABLE.SET });
    console.log('onUpdate registration', registration);
  },
  onSuccess(registration) {
    store.dispatch({ type: NEW_APP_AVAILABLE.SET });
    console.log('onSuccess registration', registration);
  },
};
serviceWorker.register(config);
