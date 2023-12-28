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
    topRow: {
        zIndex: 2,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 28
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    homeText: {
        color: '#B4A468',
        fontSize: 20,
        fontFamily: 'System',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
    },
    LoginScreenText: {
        zIndex: 2,
        flex: 1.3,
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
    },
    svgtest:{
        position: 'absolute',
        zIndex: 1,
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
StyleSheet.create({
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
    logoutButton: {
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        height: '5%',
        width: '80%',
        padding: 10,
        alignItems: 'center'
    }
});
export default styles;
