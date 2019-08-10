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
import initIndexedDB from './databases';

const DB_OS_COMPRADORES = 'compradores';

initIndexedDB(1, (request) => {
  const transaction = request.transaction([DB_OS_COMPRADORES]);
  const objectStore = transaction.objectStore(DB_OS_COMPRADORES);
  const comprador = objectStore.get("1");
  comprador.onerror = function(event) {
    console.error('error! =>' )
  // Handle errors!
  };
  comprador.onsuccess = function(event) {
  // Do something with the request.result!
  console.log("Name for 1  " + comprador.result);
  };

});
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
