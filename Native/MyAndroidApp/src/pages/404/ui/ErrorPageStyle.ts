import { StyleSheet } from "react-native";

const ErrorPageStyle = StyleSheet.create
({
    pageContainer:
    {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mainText:
    {
        color: "white",
        fontSize: 70.0,
    },
    nfText:
    {
        color: "white",
        fontSize: 25.0,
    },
});

export default ErrorPageStyle;