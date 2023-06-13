// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDftBsGbLGD_2A5iWTdyJa0F5_EE1utIko",
  authDomain: "summative-5f686.firebaseapp.com",
  projectId: "summative-5f686",
  storageBucket: "summative-5f686.appspot.com",
  messagingSenderId: "652405194238",
  appId: "1:652405194238:web:00191245232fffd49d94af",
  measurementId: "G-FQSK7XRWGM"
};

// Initialize Firebase
const config = initializeApp(firebaseConfig);
export const auth = getAuth(config);
export const firestore = getFirestore(config);