import { View } from "react-native";
import React from "react";
import styles from "../../components/styles";
import Banner from "../../assets/banner2.svg"
import {Stack} from "expo-router";


const Teacher_Page = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <Banner
                style={styles.svgtest}
                width={"100%"}
                height={'30%'}
                preserveAspectRatio={"none"}
            ></Banner>
        </View>
    );
};

export default Teacher_Page;
