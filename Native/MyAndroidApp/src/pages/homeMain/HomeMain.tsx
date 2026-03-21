import { Text, Touchable, TouchableOpacity, View } from "react-native";
import HomeMainStyle from "./ui/HomeMainStyle";
import { Image } from "react-native";
import { useContext } from "react";
import { AppContext } from "../../features/context/AppContext";

export default function Home() {
    const {navigate} = useContext(AppContext);

    return <View style={HomeMainStyle.pageContainer}>
        <Text style={HomeMainStyle.pageTitle}>React Native</Text>
        <TouchableOpacity style={HomeMainStyle.navItem} onPress={() => navigate({slug: 'calc'})}>
            <Image source={require('../../features/asset/calc.png')}
                style={HomeMainStyle.navImage}
            >
            </Image>
            <Text style={HomeMainStyle.navText}>Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={HomeMainStyle.navItem} onPress={() => navigate({slug: 'rate'})}>
            <Image source={require('../../features/asset/rate.png')}
                style={HomeMainStyle.navImage}
            >
            </Image>
            <Text style={HomeMainStyle.navText}>Exchange rate of the NBU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={HomeMainStyle.navItem} onPress={() => navigate({slug: 'anim'})}>
            <Image source={require('../../features/asset/rate.png')}
                style={HomeMainStyle.navImage}
            >
            </Image>
            <Text style={HomeMainStyle.navText}>Animations</Text>
        </TouchableOpacity>
    </View>;
}