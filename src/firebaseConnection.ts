import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpPhnQEBLE7LQJduLZTdctOjp3WdclutM",
  authDomain: "risum-b1687.firebaseapp.com",
  projectId: "risum-b1687",
  storageBucket: "risum-b1687.appspot.com",
  messagingSenderId: "402831587288",
  appId: "1:402831587288:web:0963e9179a5d18d64d24ad",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
