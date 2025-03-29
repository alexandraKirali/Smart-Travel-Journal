// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvxP4Mobt4dzaDOV_EjG3Yj_vHiC694wU",
  authDomain: "smarttraveljournal-f5500.firebaseapp.com",
  projectId: "smarttraveljournal-f5500",
  storageBucket: "smarttraveljournal-f5500.firebasestorage.app",
  messagingSenderId: "842813687016",
  appId: "1:842813687016:web:c5a5374515810f64f1f55d",
  measurementId: "G-FM0L4LFEKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);