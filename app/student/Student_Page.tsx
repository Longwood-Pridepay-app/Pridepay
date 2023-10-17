import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import { Stack, useRouter } from "expo-router";
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
                    <TouchableOpacity onPress={() => {
                        setActiveTab('home');
                        navigation.push('student/Student_Settings');
                    }}>
                        <Feather name="settings" size={22} color={"#B09778"}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.homeText}>Home</Text>
                <View style={{ flex: 0.068 }}></View>
            </View>
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'40%'}
                preserveAspectRatio={"none"}
            ></Banner>
            <View style={{marginTop: 250, marginBottom: 150}}>
                <ScrollView style={{ height: '100%' }}>
                    <View style={{paddingBottom: 11, paddingTop: 11}}>
                        <View style={styles.studentHomeSubtitles}>
                            <Text style={styles.Active}>Active Raffles</Text>
                        </View>
                        {/*Enter Raffle Component as a TouchableOpacity */}
                        <TouchableOpacity
                            onPress={() => {
                                // Handle the Enter Raffle button press
                            }}
                            style={{ alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: 25 }}
                        >
                            <View style={{ backgroundColor: '#B09778', width: 50, height: 50, borderRadius: 65, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 30, }}>+</Text>
                            </View>

                            <Text style={{ fontSize: 16, color: '#B09778', fontWeight: 'bold', paddingTop: 11, paddingRight: 6, textAlign: "center" }}>
                                Enter{'\n'}Raffle
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.studentHomeSubtitles}>
                        <Text style={styles.Active}>Recent Transactions</Text>
                        <TouchableOpacity
                            onPress={() => {
                                // Handle the View All button press
                            }}
                            style={{padding: 8, borderRadius: 8 }}
                        >
                            <Text style={styles.Viewall}>View All</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
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
