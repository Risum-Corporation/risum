import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyC4Cdsd2ity_MfrbuNK2u6ao1VBUsC9UJM",
  authDomain: "risum-56ac7.firebaseapp.com",
  databaseURL: "https://risum-56ac7-default-rtdb.firebaseio.com",
  projectId: "risum-56ac7",
  storageBucket: "risum-56ac7.appspot.com",
  messagingSenderId: "868015355717",
  appId: "1:868015355717:web:0fd1852aa66cf20f28302c",
  measurementId: "G-CNMMFSWETY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
