import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg";
import { router, Stack, useRouter } from "expo-router";
import Teacher_Navbar from "../../components/Teacher_Navbar";
import {getDatabase, ref, get, update} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getDocs, query, collection, getFirestore} from "firebase/firestore";

const Teacher_History_Page = () => {
    const navigation = useRouter();
    const [activeTab, setActiveTab] = useState('history');
    const [transactions, setTransactions] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
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
    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if(userInfo) {
            console.log(userInfo); // Check the value of userInfo
            fetchTransactions();
        }
    }, [userInfo]);

    const fetchTransactions = async () => {
        const dbFs = getFirestore();
        const teacherEmail = userInfo?.email;
        const transactionsQuery = query(collection(dbFs, 'teachers', teacherEmail, 'transactions'));

        const querySnapshot = await getDocs(transactionsQuery);
        const transactionsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Convert the Timestamp to a JavaScript Date object and then to a string
            data.date = data.date.toDate().toString();
            return data;
        });

        setTransactions(transactionsData);
    };


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

            <View style={{ marginTop: 45, marginBottom: 150 }}>
                <ScrollView style={{ height: '100%' }}>
                    <View style={{ paddingBottom: 11, paddingTop: 19 }}>
                        <View style={styles.studentHomeSubtitles}>
                            <Text style={styles.Active}>My Classes</Text>
                        </View>
                        {transactions.map((transaction, index) => (
                            <View key={index} style={styles.cardStyle}>
                                <Text>Date: {transaction.date}</Text>
                                <Text>Students: {transaction.students.join(", ")}</Text>
                                <Text>Teacher: {transaction.teacher}</Text>
                                <Text>Transaction Type: {transaction.transaction.type}</Text>
                                <Text>Details: {transaction.transaction.details}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>

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
