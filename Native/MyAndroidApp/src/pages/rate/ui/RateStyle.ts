import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const RateStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    pageTitle:
    {
        color: Colors.primaryTextColor,
        fontWeight: 600,
        fontSize: 20.0,
        textAlign: "center",
        marginVertical: 10.0,
    },
    rateLine:
    {
        display: "flex",
        flexDirection: "row",
        borderStyle: "solid",
        borderBottomColor: Colors.primaryTextColor,
        borderBottomWidth: 1.0,
    },
    rateCc:
    {
        flex: 1,
        color: "#111",
        backgroundColor: Colors.primaryTextColor,
        borderRadius: 20.0,
        fontSize: 19.0,
        textAlign: "center",
    },
    rateTxt:
    {
        flex: 5,
        color: "#111",
        fontSize: 19.0,
        backgroundColor: Colors.primaryTextColor,
        borderRadius: 20.0,
        textAlign: "center",
        textShadowColor: "#111",
        fontWeight: "bold",
    },
    rateRate:
    {
        flex: 2,
        color: Colors.primaryTextColor,
        backgroundColor: "#111",
        borderRadius: 20.0,
        textAlign: "center",
        fontSize: 19.0,
    },
});

export default RateStyle;
