import {Image, Text, View} from "react-native";
import React, {useState} from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {Stack} from "expo-router";
import Student_Navbar from '../../components/Student_Navbar';


const Student_Raffle_Page = () => {
    const [activeTab, setActiveTab] = useState('raffle');
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
                <Student_Navbar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </View>
        </View>
    );
};

export default Student_Raffle_Page;
