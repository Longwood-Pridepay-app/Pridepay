import { View } from "react-native";
import React from "react";
import styles from "../../components/styles";
import LoginBanner from "../../assets/LoginBanner.svg"


const Teacher_Page = () => {
    return (
        <View style={styles.container}>
            <LoginBanner
                style={styles.svgtest}
                width={"100%"}
                height={'62%'}
                preserveAspectRatio={"none"}
            ></LoginBanner>
        </View>
    );
};

export default Teacher_Page;
