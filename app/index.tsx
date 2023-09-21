import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";



const WelcomeScreen = () => {
    const navigation = useRouter();

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Pridepay",
                    headerStyle: {
                        backgroundColor: "#0C4531", // set the background color of the topbar
                    },
                    headerTintColor: "#B4A468", // set the color of the text in the topbar
                    headerTitleStyle: {
                        fontSize: 32, // set the font size of the text in the topbar
                        fontFamily: 'SF-Pro', // Use the font family name here
                    },
                }}
            />
        </>
    );
};

export default WelcomeScreen;
