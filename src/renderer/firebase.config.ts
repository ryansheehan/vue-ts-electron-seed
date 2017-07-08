
import * as firebase from 'firebase/app';

// App initialization
const firebaseApp: firebase.app.App = firebase.initializeApp({
  apiKey: "<api_key>",
  authDomain: "<domain>.firebaseapp.com",
  databaseURL: "https://<db_url>.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "<sender_id>"
}, "vue-ts-electron-seed");


export default firebaseApp;
