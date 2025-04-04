// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "smarttraveljournal-f5500.firebaseapp.com",
  projectId: "smarttraveljournal-f5500",
  storageBucket: "smarttraveljournal-f5500.firebasestorage.app",
  messagingSenderId: "842813687016",
  appId: "1:842813687016:web:c5a5374515810f64f1f55d",
  measurementId: "G-FM0L4LFEKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);