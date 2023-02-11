// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgJHP2z1KHMvgvqcCtGgqHS6jjuafTYxo",
  authDomain: "cashonstore-42110.firebaseapp.com",
  projectId: "cashonstore-42110",
  storageBucket: "cashonstore-42110.appspot.com",
  messagingSenderId: "604743927213",
  appId: "1:604743927213:web:0dcc3b11fa86974bc7cd24",
  measurementId: "G-XNJYWNVB39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);