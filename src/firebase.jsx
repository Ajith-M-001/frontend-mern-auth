// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-3b016.firebaseapp.com",
  projectId: "mern-auth-3b016",
  storageBucket: "mern-auth-3b016.appspot.com",
  messagingSenderId: "370144450333",
  appId: "1:370144450333:web:287e6ff3dcc47b7c01b3f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
