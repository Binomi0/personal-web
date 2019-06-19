import ReactGA from 'react-ga';

class ReactAnalitycs {
  constructor() {
    this.ReactGA = ReactGA;

    this.initializeAnalitycs();
  }

  initializeAnalitycs() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'Invitado';
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('process.env =>', process.env);
      this.ReactGA.initialize(process.env.REACT_APP_GA_ID, { debug: true });
    } else {
      this.ReactGA.initialize(process.env.REACT_APP_GA_ID, {
        gaOptions: { userId },
      });
    }
  }

  pageview(route, name) {
    this.ReactGA.pageview(route, [], name);
  }

  event(props) {
    this.ReactGA.event({ ...props });
  }
}

export default new ReactAnalitycs();
