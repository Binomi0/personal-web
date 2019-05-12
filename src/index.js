import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import createStore from './redux/create-store';
import './index.scss';
import theme from './styles/theme';

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

serviceWorker.register();
