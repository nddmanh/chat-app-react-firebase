import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyAS3QObnWxn2slb25llHz2uW7sMScNKxMk",
  authDomain: "chat-app-7d199.firebaseapp.com",
  projectId: "chat-app-7d199",
  storageBucket: "chat-app-7d199.appspot.com",
  messagingSenderId: "969846642376",
  appId: "1:969846642376:web:1240b0179792e07df7f7fd",
  measurementId: "G-YR4Y0KBMFP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', '8080')
}
 
export { db, auth };
export default firebase;