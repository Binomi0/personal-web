import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDy7YR4x5P99TmzflWTaAbcSwSVrMcz97A',
  authDomain: 'react-mongo-test.firebaseapp.com',
  databaseURL: 'https://react-mongo-test.firebaseio.com',
  projectId: 'react-mongo-test',
  storageBucket: 'react-mongo-test.appspot.com',
  messagingSenderId: '355923043574',
};

const fire = firebase.initializeApp(config);

export default fire;
