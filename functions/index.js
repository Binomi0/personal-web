const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.calculatePositionStatus = functions.firestore
//   .document('/market/DAX/position')
//   .onCreate((snapshot) => {
//     console.log('snapshot =>', snapshot);
//     // const buyPrice = snapshot.data.data().enterPrice;

//     const positionRef = admin
//       .firestore()
//       .collection('react-mongo-test')
//       .doc('market/DAX/position');

//     return positionRef.update({ status: 12000 });
//   });
