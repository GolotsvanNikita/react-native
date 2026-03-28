import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const SwipeStyle = StyleSheet.create({
    pageContainer:
    {

    },
    gameField:
    {
        backgroundColor: "#555",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-between",
    },
    tile:
    {
        height: 80.0,
        width: 80.0,
        backgroundColor: "#666",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10.0,
        marginRight: 7.0,
        marginLeft: 10.0,
        marginTop: 8.0,
    },
    textBlock:
    {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20.0,
    },
    tileContainer:
    {
        height: 80.0,
        width: 80.0,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10.0,
        marginRight: 7.0,
        marginLeft: 10.0,
        marginTop: 8.0,
    },
});

export default SwipeStyle;
