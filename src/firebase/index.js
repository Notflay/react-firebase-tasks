// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZJizwp9DqQduiNuiOIhm10EsrxgPyo8U",
  authDomain: "ob-tasks-list-firebase.firebaseapp.com",
  projectId: "ob-tasks-list-firebase",
  storageBucket: "ob-tasks-list-firebase.appspot.com",
  messagingSenderId: "475305514365",
  appId: "1:475305514365:web:00d46408d572523251a814",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Iniciamos Firestore
export const db = getFirestore(app);
