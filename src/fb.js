import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCk5FXf8nMCaLnhI-1SYl8QFQ6DSzg0Kaw',
  authDomain: 'web-test-76ea0.firebaseapp.com',
  projectId: 'web-test-76ea0',
  storageBucket: 'web-test-76ea0.appspot.com',
  messagingSenderId: '538623316787',
  appId: '1:538623316787:web:6004848bdd6251a72e2446',
  measurementId: 'G-57RFB8T6EY',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
