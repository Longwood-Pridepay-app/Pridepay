import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, {useState} from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {router, Stack, useRouter} from "expo-router";
import { Feather } from '@expo/vector-icons';
import Teacher_Navbar from "../../components/Teacher_Navbar";

const Teacher_History_Page = () => {
    const navigation = useRouter();
    const [activeTab, setActiveTab] = useState('history');

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <View style={styles.topRow}>
                <Text style={styles.homeText}>History</Text>
            </View>
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'15%'}
                preserveAspectRatio={"none"}
            >
            </Banner>

            <View style={styles.navbar}>
                <Teacher_Navbar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </View>
        </View>
    );
};

export default Teacher_History_Page;
