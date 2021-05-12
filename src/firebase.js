import firebase from 'firebase/app'
import 'firebase/auth'

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7NSvp03ZFdz8jf1hr9muDdFzY7SVYpNc",
    authDomain: "mybooks-5ea4c.firebaseapp.com",
    projectId: "mybooks-5ea4c",
    storageBucket: "mybooks-5ea4c.appspot.com",
    messagingSenderId: "726032564104",
    appId: "1:726032564104:web:7456774deb2c3baf9c443d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export function loginWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider)
        .then(snap => snap.user)
  }