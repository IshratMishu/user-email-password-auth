// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBznjvSHTiCEbq7CjmeI7hAj-vneyhbfCc",
  authDomain: "user-email-password-auth-76106.firebaseapp.com",
  projectId: "user-email-password-auth-76106",
  storageBucket: "user-email-password-auth-76106.appspot.com",
  messagingSenderId: "721882572715",
  appId: "1:721882572715:web:0aa1412d5d2cd236af54ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;