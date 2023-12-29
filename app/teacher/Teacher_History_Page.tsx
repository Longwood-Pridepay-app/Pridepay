import {Image, Text, View} from "react-native";
import React, {useState} from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {Stack} from "expo-router";
import Teacher_Navbar from "../../components/Teacher_Navbar";


const Teacher_History_Page = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View style={styles.LoginScreenText}>
                <Text style={styles.containerTest}>Raffles</Text>
            </View>
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'25%'}
                preserveAspectRatio={"none"}
            ></Banner>
            <View>
                <Teacher_Navbar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </View>
        </View>
    );
};

export default Teacher_History_Page;
