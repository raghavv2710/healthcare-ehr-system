// client/src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi5gYQE7MmuxZJc4aW3HWUbVTvH9VWqng",
  authDomain: "healthcare-ehr-system.firebaseapp.com",
  projectId: "healthcare-ehr-system",
  storageBucket: "healthcare-ehr-system.firebasestorage.app",
  messagingSenderId: "420577844363",
  appId: "1:420577844363:web:4cfdb072a7fd666252888e",
  measurementId: "G-NC9ZJH33FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);