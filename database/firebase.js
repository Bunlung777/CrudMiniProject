import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpNCA5znNN4iZc3Al90IvNXz3AdGB2hik",
  authDomain: "miniproject-8c733.firebaseapp.com",
  projectId: "miniproject-8c733",
  storageBucket: "miniproject-8c733.appspot.com",
  messagingSenderId: "822408023758",
  appId: "1:822408023758:web:8cab3d60627057f9f4ca9f",
  measurementId: "G-XCJRQVVYMX"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const analytics = getAnalytics(firebase.app());
const db = getFirestore(firebase.app());

export {db,firebase};

