import "expo-router/entry";
import { initializeApp } from "firebase/app";
import {Platform} from "react-native";

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

initializeApp(firebaseConfig);