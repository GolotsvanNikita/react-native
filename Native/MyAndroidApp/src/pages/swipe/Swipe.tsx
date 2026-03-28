import { Text, TextBase, Touchable, useWindowDimensions, View } from "react-native";
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
    const length = 16;
    const [field, setField] = useState<Array<number>>(Array.from({length}, (_, i) => (3*i + 5) % 16));

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
            const dx = event.nativeEvent.pageX - eventBegin.nativeEvent.pageX;
            const dy = event.nativeEvent.pageY - eventBegin.nativeEvent.pageY;
            const dt = event.nativeEvent.timestamp - eventBegin.nativeEvent.timestamp

            const lenX = Math.abs(dx);
            const lenY = Math.abs(dy);
            let result = "";

            if (lenX > 2 * lenY)
            {
                if (lenX < 50 || dt < 200)
                {
                    result = "Horizontal: to short";
                }
                else if (lenX * 1.5 < dt)
                {
                    result = "Horizontal: too slow"
                }
                else if (dx > 0)
                {
                    result = "Horizontal: right";
                    onSwipeRight();
                }
                else if (dx < 0)
                {
                    result = "Horizontal: left";
                    onSwipeLeft();
                }
            }
            else if (lenY > 2 * lenX)
            {
                if (lenY < 100 || dt < 200)
                {
                    result = "Vertical: to short";
                }
                else if (lenY * 2 < dt)
                {
                    result = "Vertical: too slow";
                }
                else if (dy < 0)
                {
                    result = "Vertical: top";
                    onSwipeTop();
                }
                else if (dy > 0)
                {
                    result = "Vertical: bottom";
                    onSwipeBottom();
                }
            }
            else
            {
                result = "Diagonal";
            }

            // setText(`\ndX=${dx}; \ndY=${dy}; \ndt=${dt}; \nresult=${result}`);   
        }
    };

    const onSwipeRight = () =>
    {
        let emptyTileIndex = field.findIndex(i => i == 0);

        if (emptyTileIndex % 4 == 0)
        {
            setText("Move disable");
            return;
        }

        field[emptyTileIndex] = field[emptyTileIndex - 1];
        field[emptyTileIndex - 1] = 0;
        setField([...field]);
    };

    const onSwipeLeft = () =>
    {
        let emptyTileIndex = field.findIndex(i => i == 0);

        if (emptyTileIndex % 4 == 3)
        {
            setText("Move disable");
            return;
        }

        field[emptyTileIndex] = field[emptyTileIndex + 1];
        field[emptyTileIndex + 1] = 0;
        setField([...field]);
    };

    const onSwipeTop = () =>
    {
        let emptyTileIndex = field.findIndex(i => i == 0);

        if (emptyTileIndex == 12 || emptyTileIndex == 13 || emptyTileIndex == 14 || emptyTileIndex == 15 )
        {
            setText("Move disable");
            return;
        }

        field[emptyTileIndex] = field[emptyTileIndex + 4];
        field[emptyTileIndex + 4] = 0;
        setField([...field]);
    }

    const onSwipeBottom = () =>
    {
        let emptyTileIndex = field.findIndex(i => i == 0);

        if (emptyTileIndex == 0 || emptyTileIndex == 1 || emptyTileIndex == 2 || emptyTileIndex == 3 )
        {
            setText("Move disable");
            return;
        }

        field[emptyTileIndex] = field[emptyTileIndex - 4];
        field[emptyTileIndex - 4] = 0;
        setField([...field]);
    }

    return <View style={[SwipeStyle.pageContainer, {flexDirection: width < height ? "column": "row"}]}>
        <Text>Swipe: {text}</Text>
        <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
            <View style={[SwipeStyle.gameField, {width: fieldSide, height: fieldSide}]}>
                {field.map(i => 
                <View style={SwipeStyle.tileContainer}>
                    { i != 0 && <View style={SwipeStyle.tile}>
                        <Text style={SwipeStyle.textBlock}>{i}</Text>
                    </View>}
                </View>)}
            </View>
        </TouchableWithoutFeedback>
    </View>;
}