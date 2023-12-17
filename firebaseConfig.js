// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfDvtEvEgBzWAyQe9oi7yElLEnf0r9MtA",
    authDomain: "longwood-pridepay.firebaseapp.com",
    projectId: "longwood-pridepay",
    storageBucket: "longwood-pridepay.appspot.com",
    messagingSenderId: "24556241572",
    appId: "1:24556241572:web:e714fbae1f781da6481c31",
    measurementId: "G-C8ERJBTHJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
