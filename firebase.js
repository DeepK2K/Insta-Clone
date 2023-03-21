// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8iHB7Bh2TTCXRRB25SFaOTYYgBuPziF4",
    authDomain: "insta-clone-a7432.firebaseapp.com",
    projectId: "insta-clone-a7432",
    storageBucket: "insta-clone-a7432.appspot.com",
    messagingSenderId: "671044838745",
    appId: "1:671044838745:web:c454536bce9e42abfed848",
    measurementId: "G-YXJWM1Z4FP"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();


export { db, storage }