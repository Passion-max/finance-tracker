// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbwQpgL6g0z7WPd94x40wNXh5yBrxTgnI",
  authDomain: "finance-tracker-a0fb4.firebaseapp.com",
  projectId: "finance-tracker-a0fb4",
  storageBucket: "finance-tracker-a0fb4.appspot.com",
  messagingSenderId: "306298008131",
  appId: "1:306298008131:web:c5e5fc62bbd16821abdaf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth}