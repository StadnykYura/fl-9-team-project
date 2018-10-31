import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCFdkYn3ePPypFwhuggIZe9lNFCKvUnI-E",
  authDomain: "test-smart-house-make-sence.firebaseapp.com",
  databaseURL: "https://test-smart-house-make-sence.firebaseio.com",
  projectId: "test-smart-house-make-sence",
  storageBucket: "test-smart-house-make-sence.appspot.com",
  messagingSenderId: "59683720773"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
