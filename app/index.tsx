import React from 'react';
import { Stack, useRouter } from "expo-router";
import {Button, Text, View} from "react-native";
import styles from "../components/styles";
import LoginBanner from "../assets/LoginBanner.svg"

const WelcomeScreen = () => {
    const navigation = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false, // Hide the header
                    title: "Pridepay",
                    headerStyle: {
                        backgroundColor: "#0C4531",
                    },
                    headerTintColor: "#B4A468",
                    headerTitleStyle: {
                        fontSize: 32,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                        // marginTop: 10, // Add marginTop to create padding above the title
                    },
                }}
            />
            {/* The first half of the screen with the same color as the top bar */}
            <LoginBanner style={styles.svgtest} width={"100%"} height={'60%'} preserveAspectRatio={"none"}></LoginBanner>
            <View style={styles.LoginScreenText}>
                <Text style={styles.containerTest}>PridePay</Text>
                <Button
                    title="Navigate to Student_Page"
                    onPress={() => {
                        navigation.push("student/Student_Page");
                    }}
                />
            </View>
            {/* The second half of the screen in white */}
        </View>
    );
};

export default WelcomeScreen;

