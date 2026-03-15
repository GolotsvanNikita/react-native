import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const MemoryButtonStyle = StyleSheet.create
({
    container:
    {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 5.0,
    },
    text:
    {
        color: Colors.primaryTextColor,
        fontSize: 14,
        fontWeight: '500',
    },
    disabledText:
    {
        color: '#555',
    }
});

export default MemoryButtonStyle;