// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKShsi8jwjKaUS-K9jTrWmnn_QglJJ9aU",
  authDomain: "authentication-23c87.firebaseapp.com",
  projectId: "authentication-23c87",
  storageBucket: "authentication-23c87.firebasestorage.app",
  messagingSenderId: "548400146237",
  appId: "1:548400146237:web:23c1f1ad64da4c43724754",
  measurementId: "G-HZ071JYTYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);