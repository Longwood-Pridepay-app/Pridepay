
import React from 'react';
import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from 'react-native-svg';
import styles from "../components/styles";


const WelcomeScreen = () => {
    const navigation = useRouter();

    return (

        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Pridepay",
                    headerStyle: {

                        backgroundColor: "#0C4531",
                    },
                    headerTintColor: "#B4A468",
                    headerTitleStyle: {
                        fontSize: 32,
                        fontFamily: 'System',
                        fontWeight: 'bold',
                        marginTop: 10, // Add marginTop to create padding above the title
                    },
                }}
            />
            {/* The first half of the screen with the same color as the top bar */}
            <View style={styles.topHalf}></View>
            {/* The second half of the screen in white */}
            <View style={styles.bottomHalf}></View>
        </View>

    );
};

export default WelcomeScreen;
