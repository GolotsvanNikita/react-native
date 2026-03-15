import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const CalcStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#1B2125",
        width: "100%",
    },
    display:
    {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    displayLand:
    {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    keyboardLand:
    {
        flex: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4.0,
        marginHorizontal: 8.0,
        marginVertical: 2.0,
    },

    displayLeftLand:
    {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#2c2c2cff",
    },

    keyboard: {
        flex: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4.0,
        marginHorizontal: 6.0,
        marginVertical: 8.0,
    },
    pageTitle: {
        fontWeight: 600,
        color: Colors.primaryTextColor,
    },
    expression: {
        color: "#A5AABD",
        fontSize: 20.0,
        textAlign: "right",
        marginRight: 10.0,
        marginTop: 10.0,
    },
    result: {
        color: "#F7FFFF",
        //fontSize: 60.0,
        textAlign: "right",
        marginRight: 10.0,
        marginVertical: 15.0,
    },
    resultLand: 
    {
        flex: 1,
        color: "#F7FFFF",
        backgroundColor: "#000000ff",
        textAlign: "right",
        marginVertical: 10.0,
    },
    memoryRow: {
        flex: 0.35,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4.0,
        backgroundColor: "#333",
        paddingHorizontal: 4.0,
    },
    memoryRowLand: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4.0,
        backgroundColor: "#333",
    },
    buttonsRow: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4.0,
    },
    buttonsRowLand: 
    {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4.0,
    }
});

export default CalcStyle;
