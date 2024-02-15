// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-example-d0642.firebaseapp.com",
  projectId: "mern-auth-example-d0642",
  storageBucket: "mern-auth-example-d0642.appspot.com",
  messagingSenderId: "87291877472",
  appId: "1:87291877472:web:35a8d0d0f17ea2e5d34b05",
  measurementId: "G-0RQ44Z17YH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);