import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert, Animated, RefreshControl} from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router, Stack, useLocalSearchParams} from "expo-router";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import {Ionicons} from "@expo/vector-icons";
import {getDatabase, ref, get, update} from "firebase/database";
import {serverTimestamp, getFirestore, collection, addDoc} from "firebase/firestore";

const ClassDetailsPage = () => {
    const params = useLocalSearchParams();
    const classroom = JSON.parse(params.classroom as string);
    const [students, setStudents] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [ticketCounts, setTicketCounts] = useState({});
    const [selectedStudents, setSelectedStudents] = useState({});
    const [refreshing, setRefreshing] = useState(false);

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
    const fetchStudents = async () => {
        getUserInfo()
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
    useEffect(() => {
        getUserInfo()
    }, [classroom]);
    useEffect(() => {
        fetchStudents()
    }, []);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchStudents().then(() => setRefreshing(false));
    }, []);

    const toggleStudentSelection = (studentId) => {
        // Create a copy of the current state
        let newSelectedStudents = { ...selectedStudents };

        // Inverse current selection status
        newSelectedStudents[studentId] = !newSelectedStudents[studentId];

        // Update and console log the state
        setSelectedStudents(newSelectedStudents);
        console.log(newSelectedStudents)
    };

    const selectAllStudents = () => {
        const newSelectedStudents = {};
        students.forEach(student => {
            newSelectedStudents[student.profile.id] = true;
        });
        setSelectedStudents(newSelectedStudents);
        console.log(newSelectedStudents)
    };

    const deselectAllStudents = () => {
        const newSelectedStudents = {};
        students.forEach(student => {
            newSelectedStudents[student.profile.id] = false;
        });
        setSelectedStudents(newSelectedStudents);
        console.log(newSelectedStudents)
    };

    const toggleAllStudents = () => {
        // Check if any students are selected
        const anySelected = Object.values(selectedStudents).some(value => value);

        // If no students are selected, select all students
        if (!anySelected) {
            selectAllStudents();
        }
        // If any students are selected, deselect all students
        else {
            deselectAllStudents();
        }
    };

    const giveAllStudentsOneTicket = () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to give all students one ticket?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        const dbRt = getDatabase(); // Realtime DB
                        const dbFs = getFirestore(); // Firestore DB
                        const teacherEmail = userInfo?.email
                        const transactionsCollection = collection(dbFs, 'teachers', teacherEmail, 'transactions');

                        // Array to store all student emails
                        const studentEmails = [];

                        for (const student of students) {
                            const formattedEmail = student.profile.emailAddress.replace(/\./g, '_');
                            const ticketCountRef = ref(dbRt, `users/student/${formattedEmail}`);

                            // Get the current ticket count
                            const snapshot = await get(ticketCountRef);
                            let currentCount = snapshot.exists() ? snapshot.val() : 0;

                            // If the current count is an object, convert it to a number
                            if (typeof currentCount === 'object') {
                                currentCount = Number(currentCount.ticketCount)
                            }

                            // Update the ticket count
                            const newCount = currentCount + 1;
                            await update(ticketCountRef, { 'ticketCount': newCount });

                            // Update the local state
                            setTicketCounts(prevState => ({...prevState, [student.profile.emailAddress]: newCount}));

                            // Add student email to the array
                            studentEmails.push(student.profile.emailAddress);
                        }

                        // Store the transaction data in Firestore
                        await addDoc(transactionsCollection, {
                            date: serverTimestamp(),
                            students: studentEmails,
                            teacher: teacherEmail,
                            transaction: {
                                type: 'Give All +1',
                                details: 'Each student listed above was given 1 BR3 Buck each',
                            }
                        });
                    }
                },
            ],
            { cancelable: false }
        );
    };

    // const giveSelectedStudentsOneTicket = () => {
    //     Alert.alert(
    //         "Confirmation",
    //         "Are you sure you want to give selected students one ticket?",
    //         [
    //             {
    //                 text: "Cancel",
    //                 onPress: () => console.log("Cancel Pressed"),
    //                 style: "cancel"
    //             },
    //             {
    //                 text: "OK",
    //                 onPress: async () => {
    //                     const dbRt = getDatabase(); // Realtime DB
    //                     const dbFs = getFirestore(); // Firestore DB
    //                     const teacherEmail = userInfo?.email
    //                     const transactionsCollection = collection(dbFs, 'teachers', teacherEmail, 'transactions');
    //
    //                     // Array to store all student emails
    //                     const studentEmails = [];
    //
    //                     // Iterate over the selected students
    //                     for (const studentId in selectedStudents) {
    //                         if (selectedStudents[studentId]) {
    //                             const student = students.find(student => student.profile.id === studentId);
    //                             const formattedEmail = student.profile.emailAddress.replace(/\./g, '_');
    //                             const ticketCountRef = ref(dbRt, `users/student/${formattedEmail}`);
    //
    //                             // Get the current ticket count
    //                             const snapshot = await get(ticketCountRef);
    //                             let currentCount = snapshot.exists() ? snapshot.val() : 0;
    //
    //                             // If the current count is an object, convert it to a number
    //                             if (typeof currentCount === 'object') {
    //                                 currentCount = Number(currentCount.ticketCount)
    //                             }
    //
    //                             // Update the ticket count
    //                             const newCount = currentCount + 1;
    //                             await update(ticketCountRef, { 'ticketCount': newCount });
    //
    //                             // Update the local state
    //                             setTicketCounts(prevState => ({...prevState, [student.profile.emailAddress]: newCount}));
    //
    //                             // Add student email to the array
    //                             studentEmails.push(student.profile.emailAddress);
    //                         }
    //                     }
    //
    //                     // // Store the transaction data in Firestore
    //                     // await addDoc(transactionsCollection, {
    //                     //     date: serverTimestamp(),
    //                     //     students: studentEmails,
    //                     //     teacher: teacherEmail,
    //                     //     transaction: {
    //                     //         type: 'Give Selected Students +1',
    //                     //         details: 'Each student listed above was given 1 ticket each',
    //                     //     }
    //                     // });
    //                 }
    //             },
    //         ],
    //         { cancelable: false }
    //     );
    // };

    const giveSelectedStudentsTickets = () => {

        // Check if any students are selected
        const anySelected = Object.values(selectedStudents).some(value => value);

        // If no students are selected, show an alert
        if (!anySelected) {
            Alert.alert('No Students Selected', 'Please select at least one student before giving tickets.');
            return;
        }

        Alert.prompt(
            'Enter Ticket Amount',
            'How many tickets would you like to give the selected students?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: async (value) => {
                        const dbRt = getDatabase(); // Realtime DB
                        const dbFs = getFirestore(); // Firestore DB
                        const teacherEmail = userInfo?.email
                        const transactionsCollection = collection(dbFs, 'teachers', teacherEmail, 'transactions');

                        // Array to store all student emails
                        const studentEmails = [];

                        // Iterate over the selected students
                        for (const studentId in selectedStudents) {
                            if (selectedStudents[studentId]) {
                                const student = students.find(student => student.profile.id === studentId);
                                const formattedEmail = student.profile.emailAddress.replace(/\./g, '_');
                                const ticketCountRef = ref(dbRt, `users/student/${formattedEmail}`);

                                // Get the current ticket count
                                const snapshot = await get(ticketCountRef);
                                let currentCount = snapshot.exists() ? snapshot.val() : 0;

                                // If the current count is an object, convert it to a number
                                if (typeof currentCount === 'object') {
                                    currentCount = Number(currentCount.ticketCount)
                                }

                                // Update the ticket count
                                const newCount = currentCount + Number(value);
                                await update(ticketCountRef, { 'ticketCount': newCount });

                                // Update the local state
                                setTicketCounts(prevState => ({...prevState, [student.profile.emailAddress]: newCount}));

                                // Add student email to the array
                                studentEmails.push(student.profile.emailAddress);
                            }
                        }

                        // Store the transaction data in Firestore
                        await addDoc(transactionsCollection, {
                            date: serverTimestamp(),
                            students: studentEmails,
                            teacher: teacherEmail,
                            transaction: {
                                type: 'Give Selected Students',
                                details: `${value} tickets were given to each student listed above`,
                            }
                        });
                    }
                },
            ],
            'plain-text'
        );
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
                <TouchableOpacity style={styles.selectCard} onPress={toggleAllStudents}>
                    <Text style={styles.select}>{Object.values(selectedStudents).some(value => value) ? "De-Select All" : "Select All"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.selectCard} onPress={giveAllStudentsOneTicket}>
                    <Text style={styles.giveAll}>Give All +1</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.selectCard} onPress={giveSelectedStudentsTickets}>
                    <Text style={styles.giveAll}>Give to selected students</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {students && students.map((student, index) => (
                    <View key={index} style={styles.cardStyle}>

                        <View style={[styles.studentCardStyle, {zIndex: 1}]}>
                            <Text style={styles.classCardTitle}>{student.profile.name.fullName}</Text>
                            <Text style={styles.classCardSubTitle}>{student.profile.emailAddress ? student.profile.emailAddress : 'Email not available'}</Text>
                            <View style={styles.ticketCountContainer}>
                                <Text style={styles.classCardTitle}>{ticketCounts[student.profile.emailAddress] || 'N/A'}</Text>
                                <Text style={styles.ticketSign}>BR3</Text>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPress={() => toggleStudentSelection(student.profile.id)}
                                >
                                    {selectedStudents[student.profile.id] ? (
                                        <Ionicons name="remove-circle-outline" size={30} color="#B4A468" />
                                    ) : (
                                        <Ionicons name="add-circle-outline" size={30} color="#B4A468" />
                                    )}
                                </TouchableOpacity>
                                {/*<TouchableOpacity*/}
                                {/*    style={styles.iconContainer}*/}
                                {/*    onPress={() => {*/}
                                {/*        Alert.prompt(*/}

                                {/*            'Enter BR3 Amount',*/}
                                {/*            `How much BR3 would you like to give ${student.profile.name.fullName}?`,*/}
                                {/*            [*/}

                                {/*                {*/}
                                {/*                    text: 'Cancel',*/}
                                {/*                    onPress: () => console.log('Cancel Pressed'),*/}
                                {/*                    style: 'cancel'*/}
                                {/*                },*/}
                                {/*                {*/}
                                {/*                    text: 'Confirm',*/}
                                {/*                    onPress: async (value) => {*/}
                                {/*                        const db = getDatabase();*/}
                                {/*                        const formattedEmail = student.profile.emailAddress.replace(/\./g, '_');*/}
                                {/*                        const ticketCountRef = ref(db, `users/student/${formattedEmail}`);*/}

                                {/*                        // Get the current ticket count*/}
                                {/*                        const snapshot = await get(ticketCountRef);*/}
                                {/*                        let currentCount = snapshot.exists() ? snapshot.val() : 0;*/}

                                {/*                        // If the current count is an object, convert it to a number*/}
                                {/*                        if (typeof currentCount === 'object') {*/}
                                {/*                            currentCount = Number(currentCount.ticketCount)*/}
                                {/*                        }*/}

                                {/*                        // Check if the value entered is negative*/}
                                {/*                        if (Number(value) < 0) {*/}
                                {/*                            Alert.alert('Invalid value entered', 'Cannot send negative amounts');*/}
                                {/*                            return;*/}
                                {/*                        }*/}

                                {/*                        // Check if the value entered is greater than 4, if it is then there is an "are you sure" pop-up*/}
                                {/*                        if (Number(value) > 4) {*/}
                                {/*                            Alert.alert(*/}
                                {/*                                'Are you sure?',*/}
                                {/*                                'The value entered is greater than 4. Are you sure you want to proceed?',*/}
                                {/*                                [*/}
                                {/*                                    {*/}
                                {/*                                        text: 'Cancel',*/}
                                {/*                                        onPress: () => console.log('Cancel Pressed'),*/}
                                {/*                                        style: 'cancel'*/}
                                {/*                                    },*/}
                                {/*                                    {*/}
                                {/*                                        text: 'Confirm',*/}
                                {/*                                        onPress: async () => {*/}
                                {/*                                            // Update the ticket count*/}
                                {/*                                            const newCount = currentCount + Number(value);*/}
                                {/*                                            await update(ticketCountRef, { 'ticketCount': newCount });*/}

                                {/*                                            // Show a success message*/}
                                {/*                                            Alert.alert(`${value} BR3 bucks have been sent to ${student.profile.name.fullName}. New ticket count: ${newCount}`);*/}
                                {/*                                        }*/}
                                {/*                                    },*/}
                                {/*                                ],*/}
                                {/*                                { cancelable: false }*/}
                                {/*                            );*/}
                                {/*                            return;*/}
                                {/*                        }*/}


                                {/*                        // Update the ticket count*/}
                                {/*                        const newCount = currentCount + Number(value);*/}
                                {/*                        await update(ticketCountRef, { 'ticketCount': newCount });*/}

                                {/*                        Alert.alert(`${value} BR3 bucks have been successfully sent to ${student.profile.name.fullName}!`);*/}
                                {/*                        console.log(`${value} BR3 bucks have been sent to ${student.profile.name.fullName}. New ticket count: ${newCount}`);*/}
                                {/*                    }*/}


                                {/*                },*/}
                                {/*            ],*/}
                                {/*            'plain-text'*/}
                                {/*        );*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <Ionicons name="add-circle-outline" size={30} color="#B4A468" />*/}
                                {/*</TouchableOpacity>*/}
                            </View>
                        </View>

                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ClassDetailsPage;
