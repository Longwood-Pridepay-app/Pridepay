import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClassDetailsPage = ({ classroom }) => {
    const [students, setStudents] = useState([]);

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
                    })
                    .catch((error) => {
                        console.error("Error fetching students:", error);
                    });
            }
        };
        fetchStudents();
    }, [classroom]);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{classroom.name}</Text>
            <ScrollView>
                {students.map((student, index) => (
                    <View key={index} style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 18 }}>{student.profile.name.fullName}</Text>
                        <Text style={{ fontSize: 16, color: '#666' }}>{student.profile.emailAddress}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ClassDetailsPage;
