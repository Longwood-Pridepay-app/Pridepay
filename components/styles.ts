import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text: {
        fontFamily: "SF Pro Text", // set the font family to SF Pro Text
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
    containerTest:{

    },
    topHalf: {
        flex: 1,
        backgroundColor: "#0C4531", // Set the background color of the top half
    },
    bottomHalf: {
        flex: 1,
    },
    triangleContainer: {
        alignItems: 'center',
        paddingBottom: 20, // Adjust as needed to position the triangle
    },
    triangle: {
        backgroundColor: "#0C4531",
    },
    titlePadding: {
        paddingTop: 10, // Adjust this value for the desired padding
    },
    title: {
        color: '#B4A468',
        fontSize: 32,
        fontFamily: 'System',
        fontWeight: 'bold',
    },
});


export default styles;
