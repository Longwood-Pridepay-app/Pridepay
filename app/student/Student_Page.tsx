import {Image, Text, View} from "react-native";
import React, {useState} from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {Stack} from "expo-router";
import Navbar from '../../components/Navbar';


const Student_Page = () => {
    const [activeTab, setActiveTab] = useState('home');
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View style={styles.LoginScreenText}>
                <Text style={styles.containerTest}>Home</Text>
            </View>
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'40%'}
                preserveAspectRatio={"none"}
            ></Banner>
            <View>
                <Navbar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </View>
        </View>
    );
};

export default Student_Page;
