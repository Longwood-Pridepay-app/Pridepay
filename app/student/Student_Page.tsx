import { View } from "react-native";
import React from "react";
import styles from "../../components/styles";
import LoginBanner from "../../assets/LoginBanner.svg"


const Student_Page = () => {
    return (
        <View style={styles.container}>
            <LoginBanner></LoginBanner>
        </View>
    );
};

export default Student_Page;
