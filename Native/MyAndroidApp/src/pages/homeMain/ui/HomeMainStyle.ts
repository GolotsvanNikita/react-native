import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const HomeMainStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    pageTitle: {
        color: Colors.primaryTextColor,
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 20.0,
        marginVertical: 10.0,
    },
    navTitle:
    {
        color: Colors.primaryTextColor,
        fontWeight: 600,
    },
    navImage:
    {
        tintColor: Colors.primaryTextColor,
        width: 50.0,
        height: 50.0,
        marginRight: 10.0,
    },
    navText:
    {
        color: Colors.primaryTextColor,
    },
    navItem:
    {
        borderWidth: 1.0,
        borderColor: Colors.primaryTextColor,
        margin: 10.0,
        marginHorizontal: 20.0,
        marginVertical: 10.0, 
        padding: 10.0,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
    }
});

export default HomeMainStyle;
