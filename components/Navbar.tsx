// Navbar.js

import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Navbar = ({activeTab, setActiveTab}) => {

    const activeColor = "#B4A468";
    const inActiveColor = "#FFFFFF";

    return (
        <View style={{height: 70, backgroundColor: "#0C4531", flexDirection: 'row'}}>

            <TouchableOpacity
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                onPress={

                () => setActiveTab('home')
            }
            >
                <Icon
                    name="ios-home"
                    size={20}
                    color={activeTab === 'home' ? activeColor : inActiveColor}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                onPress={

                () => setActiveTab('search')
            }
            >
                <Icon
                    name="ios-search"
                    size={20}
                    color={activeTab === 'search' ? activeColor : inActiveColor}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                onPress={

                () => setActiveTab('profile')
            }
            >
                <Icon
                    name="ios-person"
                    size={20}
                    color={activeTab === 'profile' ? activeColor : inActiveColor}
                />
            </TouchableOpacity>

        </View>
    );
}

export default Navbar;