import { Alert, Animated, Modal, Pressable, Text, TextBase, Touchable, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./ui/SwipeStyle";
import { TouchableWithoutFeedback } from "react-native";
import { GestureResponderEvent } from "react-native";
import { ReactNode, useEffect, useRef, useState } from "react";

let eventBegin: GestureResponderEvent | null;

interface IModalButton
{
    title: string,
    onPress: () => void,
    style?: Object,
}

interface IModalData 
{
    title: string,
    message: Array<string>,
    buttons?: Array<IModalButton>,
}

export default function Swipe()
{
    const {width, height} = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSide = 0.95 * shortestSide;
    const tileSide = fieldSide / 4.0;
    const [text, setText] = useState<string>("");
    const length = 16;
    const [difficulty, setDifficulty] = useState<number>(1);
    const [field, setField] = useState<Array<number>>([1, 2, 3, 8, 5, 6, 7, 4, 9, 10, 11, 12, 13, 14, 15, 0]); //(Array.from({length}, (_, i) => (i + 1 + Math.trunc(i / 4)) % 16));
    
    const [modalData, setModalData] = useState<IModalData | null>(null);
    const LEVELS_DATA =
    [
        { level: 1, indices: [0, 1, 2, 3], values: [1, 2, 3, 4] },
        { level: 2, indices: [4, 5, 6, 7], values: [5, 6, 7, 8] },
        { level: 3, indices: [8, 9, 10, 11], values: [9, 10, 11, 12] },
        { level: 4, indices: [12, 13, 14, 15], values: [13, 14, 15, 0] },
    ];
    const lastContinuedLevel = useRef<number>(0);

    const WinOne = () =>
    {
        Alert.alert('Victory', 'First Level Completed!\nStart new Game or continue?',
        [
            {
                text: 'New Game',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'Continue', onPress: () => 
            { 
                continueGameForOne.current = true;
                setDifficulty(2);
            }},
        ]);
    };


    const ModalView = () => 
    {
        setModalData({
            title: "Victory",
            message: ["First Level Completed!", "Second Level Completed!", "Third Level Completed!", "Fourth Level Completed!"],
            buttons: 
            [{
                title: "New Game",
                onPress: () => {}
            },
            {
                title: "Continue",
                onPress: () => {lastContinuedLevel.current = difficulty; if (difficulty < 4) setDifficulty(difficulty + 1);},
                style:
                {
                    backgroundColor: '#999898',
                    borderRadius: 10.0,
                    width: 100,
                    height: 40,
                    marginTop: 10.0,
                    color: '#1d1c1c',
                }
            }],
        });
    }

    useEffect(() => 
    {
        const currentWinConfig = LEVELS_DATA.find(d => d.level === difficulty);

        if (currentWinConfig && lastContinuedLevel.current !== difficulty)
        {
            const isWin = currentWinConfig.indices.every((idx, i) => 
                field[idx] === currentWinConfig.values[i]
            );

            if (isWin)
            {
                ModalView();
            }
        }
    }, [field, difficulty]);


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

        if (emptyTileIndex >= 12)
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

        if (emptyTileIndex >= 0 && emptyTileIndex <= 3)
        {
            setText("Move disable");
            return;
        }

        field[emptyTileIndex] = field[emptyTileIndex - 4];
        field[emptyTileIndex - 4] = 0;
        setField([...field]);
    }

    const isPortrait = width < height;

    const animatedValues = useRef(
        Array.from({ length: 16 }, () => new Animated.ValueXY({ x: 0, y: 0 }))
    ).current;

    const getTilePosition = (index: number) =>
    {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return {
            x: col * tileSide - 10,
            y: row * tileSide - 4 * 2,
        };
    };

    useEffect(() => 
    {
        field.forEach((tileValue, currentIndex) => 
        {
            if (tileValue !== 0) 
            {
                const { x, y } = getTilePosition(currentIndex);
            
                Animated.spring(animatedValues[tileValue], 
                {
                    toValue: { x, y },
                    useNativeDriver: true,
                    speed: 4,
                    bounciness: 5,
                }).start();
            }
        });
    }, [field]);

    const onDifficultyLeft = () => {if(difficulty > 1) setDifficulty(difficulty - 1)};
    const onDifficultyRight = () => {if(difficulty < 1) setDifficulty(difficulty + 1)};

    return <View style={[SwipeStyle.pageContainer, {flexDirection: isPortrait ? "column": "row"}]}>
        <Text>Swipe: {text}</Text>

        <Swipeable onSwipeLeft={onDifficultyLeft} onSwipeRight={onDifficultyRight}>
            <View style={[SwipeStyle.difficultyContainer, 
                {
                    marginTop: isPortrait ? 40.0 : 0,
                    marginLeft: isPortrait ? 0 : 40.0,
                }]}>
                <View style={[SwipeStyle.difficultySelector, {
                    flexDirection: isPortrait ? "row" : "column",
                    width: isPortrait ? fieldSide : 'auto',
                    height: isPortrait ? 100 : fieldSide,
                }]}>
                    {[1, 2, 3, 4].map((num) => (
                        <View key={num} style={SwipeStyle.winContainer}>
                            <Text style={SwipeStyle.winText}>{difficulty >= 2 && num == 1 ? 'WIN' : difficulty >= 3 && num == 2 ? 'WIN' : difficulty >= 4 && num == 3 ? 'WIN' : difficulty >= 5 && num == 4 ? 'WIN' : 'NO WIN'}</Text>
                            <Pressable 
                                onPress={() => setDifficulty(num)} 
                                style={[
                                    difficulty == num 
                                    // @ts-ignore
                                        ? SwipeStyle[`difficultyItemSelected${num === 1 ? '' : num}`] 
                                        : SwipeStyle.difficultyItem,
                                    { width: '80%', height: 50 }
                                ]}
                            >
                                <Text style={SwipeStyle.bottomText}>{num}</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>
        </Swipeable>

        <Swipeable onSwipeRight={onSwipeRight} onSwipeBottom={onSwipeBottom} onSwipeLeft={onSwipeLeft} onSwipeTop={onSwipeTop}>
            <View style={[SwipeStyle.gameField, {width: fieldSide, height: fieldSide}]}>
                {field.map((i, index) => 
                {
                    if (i === 0) return null;

                    return (
                        <Animated.View 
                            key={i}
                            style={[
                                SwipeStyle.tileContainer, 
                                {
                                    width: tileSide, 
                                    height: tileSide, 
                                    transform: animatedValues[i].getTranslateTransform()
                                }
                            ]}
                        >
                            <View style={
                                (i === index + 1 && i <= 4) ? SwipeStyle.tileCorrect :
                                (i === index + 1 && i > 4 && i <= 8) ? SwipeStyle.tileCorrect2 :
                                (i === index + 1 && i > 8 && i <= 12) ? SwipeStyle.tileCorrect3 :
                                (i === index + 1 && i > 12 && i <= 15) ? SwipeStyle.tileCorrect4 :
                                SwipeStyle.tile
                            }>
                                <Text style={SwipeStyle.textBlock}>{i}</Text>
                            </View>
                        </Animated.View>
                    );
                })}
            </View>
        </Swipeable>

        <View style={[SwipeStyle.difficultyContainer, 
            {
                marginTop: isPortrait ? 40.0 : 0,
                marginLeft: isPortrait ? 0 : 40.0,
            }]}>
            <View style={[SwipeStyle.difficultySelector, {
                flexDirection: isPortrait ? "row" : "column",
                width: isPortrait ? fieldSide : 'auto',
                height: isPortrait ? 100 : fieldSide,
            }]}>
                {[1, 2, 3, 4].map((num) => (
                    <View key={num} style={SwipeStyle.winContainer}>
                        <Text style={SwipeStyle.winText}>{difficulty >= 2 && num == 1 ? 'WIN' : difficulty >= 3 && num == 2 ? 'WIN' : difficulty >= 4 && num == 3 ? 'WIN' : difficulty >= 5 && num == 4 ? 'WIN' : 'NO WIN'}</Text>
                        <Pressable 
                            onPress={() => setDifficulty(num)} 
                            style={[
                                difficulty == num 
                                // @ts-ignore
                                    ? SwipeStyle[`difficultyItemSelected${num === 1 ? '' : num}`] 
                                    : SwipeStyle.difficultyItem,
                                { width: '80%', height: 50 }
                            ]}
                        >
                            <Text style={SwipeStyle.bottomText}>{num}</Text>
                        </Pressable>
                    </View>
                ))}
            </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalData != null}
          onRequestClose={() => {
            setModalData(null);
          }}>
            <View style={SwipeStyle.centeredView}>
            <View style={SwipeStyle.modalView}>
            <Text style={SwipeStyle.modalTextTitle}>{modalData?.title}</Text>
            <Text style={SwipeStyle.modalText}>{difficulty == 2 ? modalData?.message[1] : difficulty == 3 ? modalData?.message[2] : difficulty == 4 ? modalData?.message[3] : modalData?.message[0]}</Text>
            {modalData?.buttons 
            ? modalData.buttons.map(btn => <Pressable
                style={[SwipeStyle.button, btn.style ?? SwipeStyle.buttonClose]}
                key={btn.title}
                onPress={() => {setModalData(null); btn.onPress();}}>
            <Text style={SwipeStyle.textStyle}>{btn.title}</Text>
            </Pressable>)
            
            :<Pressable
                style={[SwipeStyle.button, SwipeStyle.buttonClose]}
                onPress={() => setModalData(null)}>
            <Text style={SwipeStyle.textStyle}>Hide Modal</Text>
            </Pressable>}
            
            </View>
            </View>
        </Modal>
    </View>;
}

function Swipeable(
    {onSwipeRight, onSwipeLeft, onSwipeTop, onSwipeBottom, onUrecognized, children}: 
    {onSwipeRight?:()=>void, 
        onSwipeLeft?:()=>void, 
        onSwipeTop?:()=>void, 
        onSwipeBottom?:()=>void,
        onUrecognized?:(reason:string)=>void,
    children: ReactNode}) {
        const eventBegin = useRef<GestureResponderEvent|null>(null);
        const minSwipeLength = 100.0;
        const minSwipeVelocity = 100.0 / 400.0;

        const onGestureBegin = (event: GestureResponderEvent) => {
            /*
            event.nativeEvent.pageX/Y - відлік від меж пристрою (сторінки)
            event.nativeEvent.locationX/Y - від меж блоку-детектора
            */
            eventBegin.current = event;
        };
        const onGestureEnd = (event: GestureResponderEvent) => {
            const e1 = eventBegin.current;
            if(e1) {                
                const dx = event.nativeEvent.pageX - e1.nativeEvent.pageX;
                const dy = event.nativeEvent.pageY - e1.nativeEvent.pageY;
                const dt = event.nativeEvent.timestamp - e1.nativeEvent.timestamp;
                // є три рішення: жест є горизонтальним, вертикальним або невизначеним (у межах похибок) 
                const lenX = Math.abs(dx);   
                const lenY = Math.abs(dy);
                if(lenX > 2 * lenY) {
                    // Горизонтальні жести також поділяємо на три варіанти:
                    // свайп ліворуч, праворуч або не свайп (закороткий або заповільний)
                    if(lenX < minSwipeLength) {
                        if (onUrecognized) onUrecognized("Horizontal: too short");
                    }
                    else if(lenX / dt < minSwipeVelocity) {
                        if (onUrecognized) onUrecognized("Horizontal: too slow");
                    }
                    else if(dx < 0) {
                        if (onSwipeLeft) onSwipeLeft();
                    }
                    else {
                        if (onSwipeRight) onSwipeRight();
                    }
                }
                else if(lenY > 2 * lenX) {
                    if(lenY < minSwipeLength) {
                        if (onUrecognized) onUrecognized("Vertical: too short");
                    }
                    else if(lenY / dt < minSwipeVelocity) {
                        if (onUrecognized) onUrecognized("Vertical: too slow");
                    }
                    else if(dy < 0) {
                        if (onSwipeTop) onSwipeTop();
                    }
                    else {
                        if (onSwipeBottom) onSwipeBottom();
                    }
                }
                else {
                    if (onUrecognized) onUrecognized("Diagonal");
                }
            }        
        };
    return <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
        {children}
    </TouchableWithoutFeedback>;
}