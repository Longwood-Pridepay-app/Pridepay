// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {Platform} from "react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Default to iOS app ID
let appId = "1:24556241572:ios:f6573731ec7107d3481c31";

if (Platform.OS === 'web') {
    // Override with Web ID when running on web
    appId = "1:24556241572:web:e714fbae1f781da6481c31";
}

const firebaseConfig = {
    apiKey: "AIzaSyAfDvtEvEgBzWAyQe9oi7yElLEnf0r9MtA",
    authDomain: "https://longwood-pridepay.firebaseapp.com",
    databaseURL: "https://longwood-pridepay-default-rtdb.firebaseio.com/",
    projectId: "longwood-pridepay",
    storageBucket: "longwood-pridepay.appspot.com",
    appId: appId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
