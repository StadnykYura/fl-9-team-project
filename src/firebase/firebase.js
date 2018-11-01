import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCU0tyznshqEjwVoKYB4RnrFFU6m91sgSE",
  authDomain: "fl9-team-project.firebaseapp.com",
  databaseURL: "https://fl9-team-project.firebaseio.com",
  projectId: "fl9-team-project",
  storageBucket: "fl9-team-project.appspot.com",
  messagingSenderId: "68337507824"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
