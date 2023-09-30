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
    LoginScreenText: {
        flex: 1.3,
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
    },
    svgtest:{
        position: 'absolute',
        zIndex: -1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTest:{
        fontSize: 32,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: "#B4A468"
    },
    title: {
        color: '#B4A468',
        fontSize: 32,
        fontFamily: 'System',
        fontWeight: 'bold',
    },
        longwoodlogo: {
        width: 400,
        height: 300,
        resizeMode: 'contain',
    }, button: {
     flex: 1, // DO NOTTTT mess with this
        justifyContent: 'center', // Move the button to the bottom
        alignItems: 'center' // Center horizontally
    },
    }
);

const signInButtonStyles = StyleSheet.create({
    button: {
        flex: 1, // DO NOTTTT mess with this
        justifyContent: 'center', // Move the button to the bottom
        alignItems: 'center' // Center horizontally
    },
    text: {
        color: "#475569",
        fontSize: 18,
        fontFamily: "Roboto",
        fontWeight: "bold",
        textAlign: "center", // Center the text horizontally within the button
    },

});






export default styles;
