import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyD_tV-ysKaftsPn-wkbgkKf9YMxwLwPWl4",
    authDomain: "blood-bank-app-react.firebaseapp.com",
    databaseURL: "https://blood-bank-app-react.firebaseio.com",
    projectId: "blood-bank-app-react",
    storageBucket: "blood-bank-app-react.appspot.com",
    messagingSenderId: "558486469072"
  };
 var firebaseObject=firebase.initializeApp(config);
 export default firebaseObject;