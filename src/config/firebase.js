import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Initialize Firebase adolfo-onrubia-trading-app
const firebaseConfig = {
  apiKey: "AIzaSyCXmTetg4x1D_3JixO8X6BpJe8iQrCqijw",
  authDomain: "adolfo-onrubia-trading-app.firebaseapp.com",
  databaseURL: "https://adolfo-onrubia-trading-app.firebaseio.com",
  projectId: "adolfo-onrubia-trading-app",
  storageBucket: "adolfo-onrubia-trading-app.appspot.com",
  messagingSenderId: "539923281473",
  appId: "1:539923281473:web:77d72ed21e6b07d8"
};

// Initialize Firebase react-mongo-test
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MSGSID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
