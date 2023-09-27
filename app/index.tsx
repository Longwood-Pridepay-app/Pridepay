import React from 'react';
import { Stack, useRouter } from "expo-router";
import {Text, View, Image, Pressable } from "react-native";
import styles from "../components/styles";
import signInButtonStyles from "../components/styles";
import LoginBanner from "../assets/LoginBanner.svg";

const WelcomeScreen = () => {
    const navigation = useRouter();

    return (
        <>
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                />

                <LoginBanner
                    style={styles.svgtest}
                    width={"100%"}
                    height={'62%'}
                    preserveAspectRatio={"none"}
                ></LoginBanner>
                <View style={styles.LoginScreenText}>
                    <Text style={styles.containerTest}>PridePay</Text>
                    <Image
                        source={require('../assets/longwoodlogo/longwoodlogo3x.png')}
                        style={[styles.longwoodlogo, { top: 40 }]}
                    />
                </View>
                    {/* the entire bottom half of the screen*/}
                <View style={signInButtonStyles.button}>

                    <Pressable // TODO: Add touch opacity
                        style={{
                            width: '80%', // Set width to 80% of screen width
                            backgroundColor: '#F5F5F5', // Gray background color
                            borderRadius: 12, // Border radius for rounded corners
                            padding: 10, // Padding around the button
                            flexDirection: 'row', // Make children components align horizontally
                            justifyContent: 'center', // Center align children horizontally
                            alignItems: 'center', // Center align children vertically
                        }}
                        onPress={() => {
                            navigation.push("student/Student_Page");
                        }}//THIS IS THE BUTTON
                    >
                        {/* Google Icon, to the left of the text */}
                        <Image
                            source={require('../assets/Googleicon3x.png')} // Replace with the actual path to your Google icon image
                            style={{
                                width: 28, // Adjust the width of the icon as needed
                                height: 28, // Adjust the height of the icon as needed
                                marginRight: 10, // Spacing between icon and text
                            }}
                        />

                        {/* Text to the right of the Google icon */}
                        <Text style={signInButtonStyles.text}>Sign In With Google</Text>
                    </Pressable>
                </View>
                        <View //This is the "Need Help? Email Us!" button
                            style={{
                                padding: 5, // Padding around the button
                                flexDirection: 'row', // Make children components align horizontally
                                justifyContent: 'center', // Center align children horizontally
                                alignItems: 'center', // Center align children vertically
                                marginBottom: 40,
                            }
                            }>
                            <Text style={signInButtonStyles.text}>Need Help?</Text>
                            <Text style={{ ...signInButtonStyles.text, fontWeight: 'bold' }}> Email Us!</Text>
                    </View>
            </View>
        </>
    );
};

export default WelcomeScreen;
