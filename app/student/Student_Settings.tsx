import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {Stack, useRouter} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Student_Settings = () => {
    const navigation = useRouter();
    const handleLogout = async () => {
        await AsyncStorage.removeItem('@user');
        navigation.replace("/");
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View style={styles.topRow}>
                <View>
                    <TouchableOpacity onPress={() => navigation.back()}>
                        <Ionicons name={"chevron-back"} size={30} color={"#B4A468"}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.homeText}>Settings</Text>
                <View style={{ flex: .068 }}></View>
            </View>
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'15%'}
                preserveAspectRatio={"none"}
            ></Banner>
            <ScrollView>
                <View style={{height: 700, paddingTop: 50}}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={{
                            borderRadius: 10,
                            width: 300,
                            height: 40,
                            backgroundColor: "#F1F5F9",
                            alignItems: 'center',
                            justifyContent: 'center'

                    }}
                        onPress={handleLogout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ScrollView>

        </View>
    );
};

export default Student_Settings;
