import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router, Stack, useLocalSearchParams} from "expo-router";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {Ionicons} from "@expo/vector-icons";
import {getDatabase, ref, get} from "firebase/database";

const ClassDetailsPage = () => {
    const params = useLocalSearchParams();
    const classroom = JSON.parse(params.classroom as string);
    const [students, setStudents] = useState([]);
    const [ticketCounts, setTicketCounts] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            const access_token = await AsyncStorage.getItem("@access_token");

            if (access_token) {
                // Fetch the students
                axios.get(`https://classroom.googleapis.com/v1/courses/${classroom.id}/students`, {
                    headers: { Authorization: `Bearer ${access_token}` }
                })
                    .then((res) => {
                        const students = res.data.students;
                        setStudents(students);
                        students.forEach(student => {
                            fetchTicketCount(student.profile.emailAddress);
                        });
                    })
                    .catch((error) => {
                        console.error("Error fetching students:", error);
                    });
            }
        };
        const fetchTicketCount = async (email: string) => {
            const db = getDatabase();
            const formattedEmail = email.replace(/\./g, '_');
            const ticketCountRef = ref(db, `users/student/${formattedEmail}/ticketCount`);
            console.log(formattedEmail)
            await get(ticketCountRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setTicketCounts(prevState => ({...prevState, [email]: snapshot.val()}));
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        // Fetch the students every 15 seconds
        const intervalId = setInterval(() => {
            fetchStudents();
        }, 1000); // 15000 milliseconds = 15 seconds

        // Clear the interval when the component is unmounted
        return () => {
            clearInterval(intervalId);
        };
    }, [classroom]);


    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View style={styles.topRow}>
                <View>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name={"chevron-back"} size={26} color={"#B4A468"}/>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: .068 }}></View>
            </View>
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'15%'}
                preserveAspectRatio={"none"}
            >
            </Banner>

            <Text style={{ fontSize: 24, fontWeight: 'bold', paddingTop: 64, paddingLeft: 10, fontFamily: 'System', color: '#0C4531', paddingBottom: 11 }}>{classroom.name}</Text>
            <ScrollView>
                {students && students.map((student, index) => (
                    <View key={index} style={styles.cardStyle}>
                        <Text style={styles.classCardTitle}>{student.profile.name.fullName}</Text>
                        <Text style={styles.classCardSubTitle}>{student.profile.emailAddress ? student.profile.emailAddress : 'Email not available'}</Text>
                        <View style={styles.ticketCountContainer}>
                            <Text style={styles.classCardTitle}>{ticketCounts[student.profile.emailAddress] || 'N/A'}</Text>
                            <Text style={styles.ticketSign}>BR3</Text>
                            <TouchableOpacity style={styles.iconContainer}>
                                <Ionicons name="add-circle-outline" size={30} color="#B4A468" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ClassDetailsPage;
