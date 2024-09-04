// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO-dbhdWdpGhIktSTxawuXXcUyZlS3GYI",
  authDomain: "foody-60963.firebaseapp.com",
  projectId: "foody-60963",
  storageBucket: "foody-60963.appspot.com",
  messagingSenderId: "392053035176",
  appId: "1:392053035176:web:8501c518a9535c2a4a329d",
  measurementId: "G-3ME3GTE7TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage}