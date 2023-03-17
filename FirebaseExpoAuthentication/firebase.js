// Import the functions you need from the SDKs you need
import { firebase } from '@firebase/app'
import '@firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDjS0jFnzLFgukU7NhPFqkMt40hm7j0nGg",
  authDomain: "meter-1-cf8d1.firebaseapp.com",
  databaseURL: "https://meter-1-cf8d1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "meter-1-cf8d1",
  storageBucket: "meter-1-cf8d1.appspot.com",
  messagingSenderId: "935267893191",
  appId: "1:935267893191:web:e942c8a8967817a6e4a3e2",
  measurementId: "G-0F15SHJGKV"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
