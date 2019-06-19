import * as serviceWorker from '.';
import { NEW_APP_AVAILABLE } from '../../action-types';

export default (store) => {
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
  // serviceWorker.unregister();
};
