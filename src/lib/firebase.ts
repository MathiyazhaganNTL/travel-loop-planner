import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDV08FrFXTyvtqKek1c8aPTWvIKEh4iF6U",
  authDomain: "traveloop-7289d.firebaseapp.com",
  projectId: "traveloop-7289d",
  storageBucket: "traveloop-7289d.firebasestorage.app",
  messagingSenderId: "796454682840",
  appId: "1:796454682840:web:1395b3e6b8d51adb9257ad",
  measurementId: "G-ET30TZ5QY1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
