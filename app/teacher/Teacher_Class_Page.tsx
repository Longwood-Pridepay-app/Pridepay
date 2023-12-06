import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert, Animated} from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router, Stack, useLocalSearchParams} from "expo-router";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {Ionicons} from "@expo/vector-icons";
import {getDatabase, ref, get, update} from "firebase/database";

const ClassDetailsPage = () => {
    const params = useLocalSearchParams();
    const classroom = JSON.parse(params.classroom as string);
    const [students, setStudents] = useState([]);
    const [ticketCounts, setTicketCounts] = useState({});
    const [selectedStudents, setSelectedStudents] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            const access_token = await AsyncStorage.getItem("@access_token");

            if (access_token) {
                // Fetch the students
                axios.get(`https://classroom.googleapis.com/v1/courses/${classroom.id}/students`, {
                    headers: { Authorization: `Bearer ${access_token}` }
                })
                    .then((res) => {
                        const students = res.data.students.map(student => ({
                            ...student,
                            animation: new Animated.Value(0),
                        }));
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
        }, 8000);

        // Clear the interval when the component is unmounted
        return () => {
            clearInterval(intervalId);
        };
    }, [classroom]);

    const selectAllStudents = () => {
        const newSelectedStudents = {};
        students.forEach(student => {
            newSelectedStudents[student.profile.id] = true;
            Animated.timing(student.animation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
        setSelectedStudents(newSelectedStudents);
    };

    const deselectAllStudents = () => {
        const newSelectedStudents = {};
        students.forEach(student => {
            newSelectedStudents[student.profile.id] = false;
            Animated.timing(student.animation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
        setSelectedStudents(newSelectedStudents);
    };

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
                        <Ionicons name={"chevron-back"} size={30} color={"#B4A468"}/>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: .068 }}></View>
            </View>
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'13%'}
                preserveAspectRatio={"none"}
            ></Banner>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.className}>
                    {classroom.name.length > 30
                        ? `${classroom.name.substring(0, 30)}...`
                        : classroom.name
                    }
                </Text>
            </View>
            <View style={styles.ticketBar}>
                <TouchableOpacity style={styles.selectCard} onPress={selectAllStudents}>
                    <Text style={styles.select}>Select All</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.selectCard} onPress={deselectAllStudents}>
                    <Text style={styles.select}>De-Select All</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.selectCard}>
                    <Text style={styles.giveAll}>Give All +1</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                {students && students.map((student, index) => (
                    <View key={index} style={styles.cardStyle}>
                        <Animated.View style={[styles.studentCardStyle, { zIndex: 1 }]}>
                            <Text style={styles.classCardTitle}>{student.profile.name.fullName}</Text>
                            <Text style={styles.classCardSubTitle}>{student.profile.emailAddress ? student.profile.emailAddress : 'Email not available'}</Text>
                            <View style={styles.ticketCountContainer}>
                                <Text style={styles.classCardTitle}>{ticketCounts[student.profile.emailAddress] || 'N/A'}</Text>
                                <Text style={styles.ticketSign}>BR3</Text>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPress={() => {
                                        Alert.prompt(
                                            'Enter BR3 Amount',
                                            `How much BR3 would you like to give ${student.profile.name.fullName}?`,
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: 'Confirm',
                                                    onPress: async (value) => {
                                                        const db = getDatabase();
                                                        const formattedEmail = student.profile.emailAddress.replace(/\./g, '_');
                                                        const ticketCountRef = ref(db, `users/student/${formattedEmail}`);

                                                        // Get the current ticket count
                                                        const snapshot = await get(ticketCountRef);
                                                        let currentCount = snapshot.exists() ? snapshot.val() : 0;

                                                        // If the current count is an object, convert it to a number
                                                        if (typeof currentCount === 'object') {
                                                            currentCount = Number(currentCount.ticketCount)
                                                        }

                                                        // Check if the value entered is negative
                                                        if (Number(value) < 0) {
                                                            Alert.alert('Invalid value entered', 'Cannot send negative amounts');
                                                            return;
                                                        }

                                                        // Check if the value entered is greater than 4, if it is then there is an "are you sure" pop-up
                                                        if (Number(value) > 4) {
                                                            Alert.alert(
                                                                'Are you sure?',
                                                                'The value entered is greater than 4. Are you sure you want to proceed?',
                                                                [
                                                                    {
                                                                        text: 'Cancel',
                                                                        onPress: () => console.log('Cancel Pressed'),
                                                                        style: 'cancel'
                                                                    },
                                                                    {
                                                                        text: 'Confirm',
                                                                        onPress: async () => {
                                                                            // Update the ticket count
                                                                            const newCount = currentCount + Number(value);
                                                                            await update(ticketCountRef, { 'ticketCount': newCount });

                                                                            // Show a success message
                                                                            Alert.alert(`${value} BR3 bucks have been sent to ${student.profile.name.fullName}. New ticket count: ${newCount}`);
                                                                        }
                                                                    },
                                                                ],
                                                                { cancelable: false }
                                                            );
                                                            return;
                                                        }


                                                        // Update the ticket count
                                                        const newCount = currentCount + Number(value);
                                                        await update(ticketCountRef, { 'ticketCount': newCount });

                                                        Alert.alert(`${value} BR3 bucks have been successfully sent to ${student.profile.name.fullName}!`);
                                                        console.log(`${value} BR3 bucks have been sent to ${student.profile.name.fullName}. New ticket count: ${newCount}`);
                                                    }


                                                },
                                            ],
                                            'plain-text'
                                        );
                                    }}
                                >
                                    <Ionicons name="add-circle-outline" size={30} color="#B4A468" />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>

                        <Animated.View style={[styles.secondCardStyle, { zIndex: 0, opacity: student.animation }]}>
                            {/* Content of the second card... */}
                        </Animated.View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ClassDetailsPage;
