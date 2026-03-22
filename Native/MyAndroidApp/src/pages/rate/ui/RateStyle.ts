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
    rateCcAlt:
    {
        flex: 1,
        color: "#ffffff",
        backgroundColor: "rgb(117, 117, 117)",
        borderRadius: 20.0,
        fontSize: 19.0,
        textAlign: "center",
    },
    rateTxtAlt:
    {
        flex: 5,
        color: "#ffffff",
        fontSize: 19.0,
        backgroundColor: "rgb(117, 117, 117)",
        borderRadius: 20.0,
        textAlign: "center",
        textShadowColor: "#111",
        fontWeight: "bold",
    },
    rateRateAlt:
    {
        flex: 2,
        color: Colors.primaryTextColor,
        backgroundColor: "#313131",
        borderRadius: 20.0,
        textAlign: "center",
        fontSize: 19.0,
    },
    titleDate:
    {
        color: Colors.primaryTextColor,
    },
    pageTitleRow:
    {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    search:
    {
        borderWidth: 1.0,
        borderColor: "#888",
        flex:0.5,
    },
    dateView:
    {
        color: Colors.primaryTextColor,
    },
    searchContainer:
    {
        flex: 1,
        marginBottom: 30.0,
    },
});

export default RateStyle;
