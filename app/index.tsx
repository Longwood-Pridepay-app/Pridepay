import React from 'react';
import { Stack, useRouter } from "expo-router";
import { Text, View, Image, Pressable, Linking } from "react-native";
import styles from "../components/styles";
import signInButtonStyles from "../components/styles";
import LoginBanner from "../assets/LoginBanner.svg";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

const WelcomeScreen = () => {
    const navigation = useRouter();

    // Function to open the email app
    const handleEmailUs = () => {
        const emailAddress = 'biglildev@gmail.com';
        const subject = 'I have a question, {Name}: {Teacher/Student/Admin}: {Grade/Age}';

        const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;

        console.log('Email URL:', emailUrl);

        Linking.openURL(emailUrl)
            .then(() => console.log('Email app opened successfully'))
            .catch(error => console.error('Error opening email app:', error));
    };
    const YOUR_CLIENT_ID = "24556241572-a2aje2q49jideas0u627rbvab62vnkah.apps.googleusercontent.com"
    const YOUR_REDIRECT_URI = "https://longwood-pridepay.firebaseapp.com/__/auth/handler"


    const googleConfig = {
        issuer: 'https://accounts.google.com',
        clientId: YOUR_CLIENT_ID,
        redirectUrl: YOUR_REDIRECT_URI,
        scopes: ['openid', 'profile', 'email'],
    };

    const handleGoogleSignIn = async () => {
        try {
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`;

            const { type, params } = await WebBrowser.openAuthSessionAsync(
                authUrl
            );

            if (type === 'success') {
                // Handle the successful login, e.g., exchange the authorization code for an access token.
                console.log('Google OAuth success', params);
            } else {
                // Handle errors or cancellation.
                console.log('Google OAuth failed', type);
            }
        } catch (error) {
            console.error('Error during Google OAuth', error);
        }
    };

// Function to decode the id_token to get user information
    const decodeIdToken = async (idToken: any) => {
        const decodedToken = await fetch(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
        ).then((response) => response.json());

        return decodedToken;
    };


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
                    <Pressable // Sign In With Google button
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
                            handleGoogleSignIn()
                        }}
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
                <Pressable // "Need Help? Email Us!" button
                    onPress={handleEmailUs} // Call the function to open the email app
                    style={{
                        padding: 5, // Padding around the button
                        flexDirection: 'row', // Make children components align horizontally
                        justifyContent: 'center', // Center align children horizontally
                        alignItems: 'center', // Center align children vertically
                        marginBottom: 40,
                    }}
                >
                    <Text style={signInButtonStyles.text}>Need Help?</Text>
                    <Text style={{ ...signInButtonStyles.text, fontWeight: 'bold' }}> Email Us!</Text>
                </Pressable>
            </View>
        </>
    );
};

export default WelcomeScreen;
