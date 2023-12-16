
import { View, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useRouter} from "expo-router";
// @ts-ignore
const Teacher_Navbar = ({activeTab, setActiveTab}) => {
    const navigation = useRouter();
    const activeColor = "#B4A468";
    const inActiveColor = "#FFFFFF";

    return (
        <View style={{height: 70, backgroundColor: "#0C4531", flexDirection: 'row'}}>

            <TouchableOpacity
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {
                    setActiveTab('home');
                    navigation.replace('teacher/Teacher_Page');
                }}
            >
                <Ionicons
                    name="home"
                    size={25}
                    color={activeTab === 'home' ? activeColor : inActiveColor}
                />
            </TouchableOpacity>



            <TouchableOpacity
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {
                    setActiveTab('raffle');
                    navigation.replace('teacher/Teacher_Raffle_Page');
                }}
            >
                <MaterialCommunityIcons
                    name="ticket-confirmation-outline"
                    size={25}
                    color={activeTab === 'raffle' ? activeColor : inActiveColor}
                />
            </TouchableOpacity>




            <TouchableOpacity
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {
                    setActiveTab('history');
                    navigation.replace('teacher/Teacher_History_Page');
                }}
            >
                <MaterialIcons
                    name="receipt"
                    size={25}
                    color={activeTab === 'store' ? activeColor : inActiveColor}
                />
            </TouchableOpacity>

        </View>
    );
}

export default Teacher_Navbar;
