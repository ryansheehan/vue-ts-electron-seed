
import * as firebase from 'firebase/app';

// App initialization
const firebaseApp: firebase.app.App = firebase.initializeApp({
  apiKey: "AIzaSyAo6xJ0zsKWkrIzPOET0KfEiFrVD7SkD24",
  authDomain: "picjade-11cec.firebaseapp.com",
  databaseURL: "https://picjade-11cec.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "93538683713"
}, "emotivent");


export default firebaseApp;
