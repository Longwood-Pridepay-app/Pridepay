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
        svgtest: {
            position: 'absolute',
            zIndex: 1,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        containerTest: {
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
        longwoodLogo: {
            width: 400,
            height: 300,
            resizeMode: 'contain',
        }, button: {
            flex: 1, // DO NOTTTT mess with this
            justifyContent: 'center', // Move the button to the bottom
            alignItems: 'center' // Center horizontally
        },
        Active: {
            color: '#0C4531',
            fontSize: 18,
            fontFamily: 'system',
            fontWeight: "500",
            paddingTop: 1
        },
        viewAll: {
            color: '#0C4531',
            fontSize: 16,
            fontFamily: 'system',
            fontWeight: "500",
            alignItems: 'center',

        },
        studentHomeScroll1: {
            marginTop: 250,
            marginBottom: 150
        },
        studentHomeSubtitles: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16
        },
        greetingText: {
            color: '#B4A468',
            fontSize: 28,
            fontFamily: 'System',
            fontWeight: 'normal',
            textAlign: 'left',
        },
        Greeting: {
            zIndex: 2,
            paddingTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 28,
            marginBottom: -25,
        },
         nameText: {
            color: '#B4A468',
            fontSize: 16,
            fontFamily: 'System',
            fontWeight: 'normal',
            textAlign: 'left',
            paddingLeft: 10
        },
    totalBucksHeading: {
        zIndex: 2,
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 28,
        marginBottom: -25,
    },
    totalBucksText: {
        color: '#B4A468',
        fontSize: 60,
        fontFamily: 'System',
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
    },
    totalBucksText2: {
        color: '#B4A468',
        fontSize: 20,
        fontFamily: 'System',
        fontWeight: 'regular',
        textAlign: 'center',
        flex: 1,
        paddingTop: 40,
        paddingLeft: -20,
    },
    smallText: {
        fontSize: 20,
        color: '#B4A468',
    },
    cardStyle: {
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        padding: 12,
        marginHorizontal: 8,
        marginTop: 7,
        marginBottom: 6,
        position: 'relative',
    },
    studentCardStyle: {
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        padding: 6,
        marginHorizontal: 8,
    },
    classCardTitle: {
        color: '#0C4531',
        fontFamily: 'System',
        fontWeight: "500",
    },
    classCardSubTitle: {
        color: '#0C4531',
        fontFamily: 'System',
        fontWeight: "500",
        fontSize: 10,
    },
    ticketCountContainer: {
        position: 'absolute',
        right: 10,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginLeft: 10,
    },
    ticketSign:{
        color: '#0C4531',
        fontSize: 8,
        paddingTop: 4,
        paddingLeft: 1,
    },
    className:{
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 48,
        paddingLeft: 11,
        fontFamily: 'System',
        color: '#0C4531',
        paddingBottom: 11
    },
    giveAll:{
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'System',
        color: '#B4A468',
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end"

    },
    select:{
        fontSize: 13,
        fontWeight: 'medium',
        fontFamily: 'System',
        color: '#0C4531',
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    selectCard:{
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'System',
        color: '#B4A468',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    ticketBar: {
        paddingBottom: 11,
        flexDirection: "row",
        justifyContent: "space-evenly",
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
    },

});
export default styles;
