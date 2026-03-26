import { Text, Touchable, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./ui/SwipeStyle";
import { TouchableWithoutFeedback } from "react-native";
import { GestureResponderEvent } from "react-native";
import { useState } from "react";

let eventBegin: GestureResponderEvent | null;

export default function Swipe()
{
    const {width, height} = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSide = 0.95 * shortestSide;
    const [text, setText] = useState<string>("");

    const onGestureBegin = (event: GestureResponderEvent) =>
    {
        // setText(`event.nativeEvent.pagex=${event.nativeEvent.pageX};
        //      event.nativeEvent.pagey=${event.nativeEvent.pageY};
        //      event.nativeEvent.locationx=${event.nativeEvent.locationX};
        //      event.nativeEvent.locationy=${event.nativeEvent.locationY};
        // `);
        eventBegin = event;
    };

    const onGestureEnd = (event: GestureResponderEvent) =>
    {
        if (eventBegin)
        {
            setText(`dX=${event.nativeEvent.locationX - eventBegin.nativeEvent.locationX};
                 dY=${event.nativeEvent.locationY - eventBegin.nativeEvent.locationY};`);
        }
    };

    return <View style={{flexDirection: width < height ? "column": "row"}}>
        <Text>Swipe: {text}</Text>
        <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
            <View style={{width: fieldSide, height: fieldSide, backgroundColor: "#555"}}></View>
        </TouchableWithoutFeedback>
    </View>;
}