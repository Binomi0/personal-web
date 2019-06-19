import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import createStore from '../redux/create-store';
import theme from '../styles/theme';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  let store;
  let wrapper;
  beforeAll(() => {
    store = createStore();
    wrapper = mount(
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>,
    );
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
