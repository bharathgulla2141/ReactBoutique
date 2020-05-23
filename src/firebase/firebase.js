import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC82z9G_RBdA4_TYg9sWB0kZbk-iHXA7fw",
    authDomain: "react-expensify-e372e.firebaseapp.com",
    databaseURL: "https://react-expensify-e372e.firebaseio.com",
    projectId: "react-expensify-e372e",
    storageBucket: "react-expensify-e372e.appspot.com",
    messagingSenderId: "738717040310",
    appId: "1:738717040310:web:8f58338501c33db94e7017",
    measurementId: "G-1J2KK9B0ZW"
};

firebase.initializeApp(firebaseConfig);

const googleProvider = new firebase.auth.GoogleAuthProvider();

const fireStoreDb = firebase.firestore();

export {firebase, googleProvider, fireStoreDb}