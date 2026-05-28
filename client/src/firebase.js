import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCmr_NWjIDwFCe_3RTDymox84Tyq0undGY",
  authDomain: "mern-ecom-50148.firebaseapp.com",
  projectId: "mern-ecom-50148",
  storageBucket: "mern-ecom-50148.firebasestorage.app",
  messagingSenderId: "473854747645",
  appId: "1:473854747645:web:2c7659a280612ce285af94",
  measurementId: "G-MNKYS0P3WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();