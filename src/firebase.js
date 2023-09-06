import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCAQhJK7dkWKm4Dtk-uN_ThgJs40p5FAp0",
  authDomain: "typing-trainer-ec708.firebaseapp.com",
  projectId: "typing-trainer-ec708",
  storageBucket: "typing-trainer-ec708.appspot.com",
  messagingSenderId: "77438047278",
  appId: "1:77438047278:web:656bb09a6dbb678419bbbf",
  measurementId: "G-F6NCHXKYTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth =  getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();