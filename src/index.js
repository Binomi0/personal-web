import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import App from './containers/App';
import createStore from './redux/create-store';
import theme from './styles/theme';
import './index.scss';
import './utils/analitycs/google-analitycs';
import serviceWorker from './utils/serviceWorker/notifications';

const store = createStore();
serviceWorker(store);

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
