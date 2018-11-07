import firebase from 'firebase/app';
import 'firebase/auth';
require('firebase/firestore');

const config = {
  apiKey: 'AIzaSyCU0tyznshqEjwVoKYB4RnrFFU6m91sgSE',
  authDomain: 'fl9-team-project.firebaseapp.com',
  databaseURL: 'https://fl9-team-project.firebaseio.com',
  projectId: 'fl9-team-project',
  storageBucket: 'fl9-team-project.appspot.com',
  messagingSenderId: '68337507824',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// const firestore = firebase.firestore();
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const auth = firebase.auth();

export { auth, db };
