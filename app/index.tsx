import React from 'react';
import { Stack, useRouter } from "expo-router";
import { Text, View, Image, Pressable, Linking } from "react-native";
import styles from "../components/styles";
import signInButtonStyles from "../components/styles";
import LoginBanner from "../assets/LoginBanner.svg";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, set, get } from "firebase/database";

const WelcomeScreen = () => {
    const navigation = useRouter();
    const db = getDatabase();

    const [userInfo, setUserInfo] = React.useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: "24556241572-ia0etu72ig1ensl9vfmb9u36cro4u064.apps.googleusercontent.com",
        webClientId: "24556241572-a2aje2q49jideas0u627rbvab62vnkah.apps.googleusercontent.com",
        androidClientId: "24556241572-c5l9d0js402o7tp07h71u985m2cak2rb.apps.googleusercontent.com",
    });

    React.useEffect(() => {
        handleSignInWithGoogle()
            .then(() => {
                // Success!
            })
            .catch(error => {
                // Handle error
            });
    }, [response]);

    const handleSignInWithGoogle = async () => {
        const user = await AsyncStorage.getItem("@user");

        if (user) {
            // User already logged in
            setUserInfo(JSON.parse(user));
            handleExistingUser(JSON.parse(user));
        } else if (response?.type === "success") {
            await getUserInfo(response.authentication?.accessToken);
        }
    };

    const getUserInfo = async (token) => {
        if (!token) return;

        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const user = await response.json();

            console.log(user);
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);

            handleNewUser(user);

        } catch (error) {
            // Handle error
        }
    };

    const handleExistingUser = (user) => {
        const email = user.email;

        if (email.endsWith("@gmail.com") && email !== "biglildev@gmail.com") {
            navigation.replace("student/Student_Page");
        } else if (email.endsWith("@students.longwoodschools.org") || email === "biglildev@gmail.com") {
            navigation.replace("student/Student_Page");
        }
    };

    const handleNewUser = async (user) => {
        const email = user.email;

        if (email.endsWith("@gmail.com") && email !== "biglildev@gmail.com") {
            const formattedEmail = user.email.replace(/\./g, '_');
            const teacherRef = ref(db, `users/teacher/${formattedEmail}`);

            // First check if teacher data exists
            const snapshot = await get(teacherRef);
            if (!snapshot.exists()) {
                await set(teacherRef, {
                    fullName: user.name
                });
            }

            navigation.replace("student/Student_Page");

        } else if (email.endsWith("@students.longwoodschools.org") || email === "biglildev@gmail.com") {
            const formattedEmail = user.email.replace(/\./g, '_');
            const studentRef = ref(db, `users/student/${formattedEmail}`);

            const snapshot = await get(studentRef);
            if (!snapshot.exists()) {
                await set(studentRef, {
                    fullName: user.name,
                    ticketCount: 0
                });
            }

            navigation.replace("student/Student_Page"/*"teacher/Teacher_Page"*/);
        }
    };
// Handle user state changes
   // const deleteLocalStorage = () => {AsyncStorage.removeItem("@user")};
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


//test2

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
                        onPress={() => promptAsync()}
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
