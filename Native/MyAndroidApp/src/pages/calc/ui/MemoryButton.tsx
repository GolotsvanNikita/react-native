import { TouchableOpacity, Text } from "react-native";
import { MemoryButtonTypes } from "../model/MemoryButtonTypes";
import MemoryButtonStyle from "./MemoryButtonStyle";

interface Props
{
    text: string;
    type: MemoryButtonTypes;
    onPress?: () => void;
}

export default function MemoryButton({ text, type, onPress }: Props)
{
    const isEnabled = type === MemoryButtonTypes.enabled;

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={MemoryButtonStyle.container}
        >
            <Text style={[MemoryButtonStyle.text, !isEnabled && MemoryButtonStyle.disabledText]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}