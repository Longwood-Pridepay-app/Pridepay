import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {router, Stack, useRouter} from "expo-router";
import Student_Navbar from '../../components/Student_Navbar';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
import axios from 'axios';

const Teacher_Page = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigation = useRouter();
    const [activeTab, setActiveTab] = useState('home');
    const db = getDatabase();
    const [classes, setClasses] = useState([]);
    const [classroom, setClassroom] = useState(null);

    const getUserInfo = async () => {
        try {
            const userInfoStr = await AsyncStorage.getItem('@user');
            if (typeof userInfoStr === "string") {
                setUserInfo(JSON.parse(userInfoStr));
            }
        } catch (e) {
            // error reading value
        }
    };

    const getGreeting = () => {
        const hrs = new Date().getHours();
        if (hrs < 12) return 'Good Morning';
        else if (hrs >= 12 && hrs <= 17) return 'Good Afternoon';
        else return 'Good Evening';
    };

    useEffect(() => {
        const fetchClasses = async () => {
            const access_token = await AsyncStorage.getItem("@access_token");

            if (access_token) {
                // Fetch the classes
                axios.get("https://classroom.googleapis.com/v1/courses", {
                    headers: { Authorization: `Bearer ${access_token}` }
                })
                    .then(async (res) => {
                        const classes = res.data.courses;
                        // Fetch the student count for each class
                        const classPromises = classes.map(async (classroom) => {
                            try {
                                const response = await axios.get(`https://classroom.googleapis.com/v1/courses/${classroom.id}/students`, {
                                    headers: { Authorization: `Bearer ${access_token}` }
                                });
                                if (response.data && response.data.students) {
                                    classroom.studentCount = response.data.students.length;
                                } else {
                                    classroom.studentCount = 0; // Handle undefined or missing data
                                }
                            } catch (error) {
                                console.error("Error updating class:", error);
                                classroom.studentCount = 0; // Handle errors by setting the count to 0
                            }
                            return classroom;
                        });

                        Promise.all(classPromises)
                            .then((updatedClasses) => {
                                console.log(updatedClasses);
                                setClasses(updatedClasses);
                            })
                            .catch((error) => {
                                console.error("Error updating classes:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error fetching classes:", error);
                    });
            }
        };
        fetchClasses();
        getUserInfo();
    }, []);

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
                        <Feather name="settings" size={22} color={"#B09778"} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.homeText}>Home</Text>
                <View style={{ flex: 0.068 }}></View>
            </View>
            <View style={styles.Greeting}>
                <Text style={styles.greetingText}>{getGreeting()}</Text>
            </View>
            <View style={styles.Greeting}>
                <Text style={styles.nameText}>Hi, {userInfo?.name}</Text>
            </View>
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'25%'}
                preserveAspectRatio={"none"}
            >
            </Banner>
            <View style={{ marginTop: 70, marginBottom: 150 }}>
                <ScrollView style={{ height: '100%' }}>
                    <View style={{ paddingBottom: 11, paddingTop: 19 }}>
                        <View style={styles.studentHomeSubtitles}>
                            <Text style={styles.Active}>My Classes</Text>
                        </View>
                        {classes.map((classroom, index) => (
                            <TouchableOpacity onPress={() => {
                                console.log("Classroom data:", classroom);
                                setClassroom(classroom);
                                router.push({
                                    pathname: 'teacher/Teacher_Class_Page',
                                    params: { classroom: JSON.stringify(classroom) }
                                });
                            }}>
                            <View key={index} style={styles.cardStyle}>
                                <Text style={styles.classCardTitle}>{classroom?.name}</Text>
                                <Text style={styles.classCardTitle}>{classroom?.studentCount} students</Text>
                            </View>
                            </TouchableOpacity>
                        ))}
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

export default Teacher_Page;
