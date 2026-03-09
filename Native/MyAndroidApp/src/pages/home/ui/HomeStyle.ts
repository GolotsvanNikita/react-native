import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
    pageContainer: {
        flexDirection: "row",
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        justifyContent: "center",
        marginTop: 5.0,
    },
    pageTitle: {
        fontWeight: 600,
    },
    BarIcon:
    {
        backgroundColor: "#bbb",
        height: 80.0,
        width: 80.0,
        opacity: 0.5,
    },
    card:
    {
        width: 120.0,
        height: 120.0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text:
    {
        color: "white",
        fontSize: 20.0,
    }
});

export default HomeStyle;
