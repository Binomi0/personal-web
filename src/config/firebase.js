import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Initialize Firebase adolfo-onrubia-trading-app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSGSID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

// Initialize Firebase react-mongo-test
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MSGSID,
// };
// REACT_APP_FIREBASE_API_KEY = 'AIzaSyDy7YR4x5P99TmzflWTaAbcSwSVrMcz97A'
// REACT_APP_FIREBASE_AUTH_DOMAIN = 'react-mongo-test.firebaseapp.com'
// REACT_APP_FIREBASE_DATABASE_URL = 'https://react-mongo-test.firebaseio.com'
// REACT_APP_FIREBASE_PROJECT_ID = 'react-mongo-test'
// REACT_APP_FIREBASE_STORAGE_BUCKET = 'react-mongo-test.appspot.com'
// REACT_APP_FIREBASE_MSGSID = '355923043574'

firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

export default firebase;
