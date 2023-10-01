import {Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {Stack, useRouter} from "expo-router";
import Student_Navbar from '../../components/Student_Navbar';
import { Feather } from '@expo/vector-icons';

const Student_Page = () => {
    const navigation = useRouter();
    const [activeTab, setActiveTab] = useState('home');
    return (

        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View style={styles.topRow}>
                <View>
                <TouchableOpacity onPress={() => { setActiveTab('home');
                        navigation.push('student/Student_Settings');
                    }}>
                    <Feather name="settings" size={22} color={"#B4A468"}/>
                </TouchableOpacity>
            </View>
                <Text style={styles.homeText}>Home</Text>
                <View style={{ flex: .068 }}></View>
            </View>
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'40%'}
                preserveAspectRatio={"none"}
            ></Banner>
            <View style={styles.navbar}>
                <Student_Navbar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </View>
        </View>
    );
};

export default Student_Page;
