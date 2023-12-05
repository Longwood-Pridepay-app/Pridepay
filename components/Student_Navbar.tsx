
import { View, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useRouter} from "expo-router";
import Icon from 'react-native-vector-icons'
// @ts-ignore
const Student_Navbar = ({activeTab, setActiveTab}) => {
    const navigation = useRouter();
    const activeColor = "#B4A468";
    const inActiveColor = "#FFFFFF";

    return (
        <View style={{height: 70, backgroundColor: "#0C4531", flexDirection: 'row'}}>

            <TouchableOpacity
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                onPress={() => {
                    setActiveTab('home');
                    navigation.replace('student/Student_Page');
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
                    navigation.replace('student/Student_Raffle_Page');
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
                    setActiveTab('store');
                    navigation.replace('student/Student_Store_Page');
                }}
            >
                <MaterialIcons
                    name="store"
                    size={25}
                    color={activeTab === 'store' ? activeColor : inActiveColor}
                />
            </TouchableOpacity>

        </View>
    );
}

export default Student_Navbar;
