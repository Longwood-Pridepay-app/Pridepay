import "expo-router/entry";
import { initializeApp } from "firebase/app";
import {Platform} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Teacher_Page from './app/teacher/Teacher_Page';
import ClassDetailsPage from './app/teacher/Teacher_Class_Page';

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

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Teacher_Page">
                <Stack.Screen name="Teacher_Page" component={Teacher_Page} />
                <Stack.Screen name="ClassDetailsPage" component={ClassDetailsPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
