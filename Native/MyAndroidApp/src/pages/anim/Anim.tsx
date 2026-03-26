import { Animated, Pressable, Text, View } from "react-native";
import AnimStyle from "./ui/AnimStyle";
import { useEffect, useRef, useState } from "react";

let fadeOutValue = new Animated.Value(1);
let checkClick = false;

export default function Anim()  
{
    const fadeOutPress = () =>
    {
        if (!checkClick)
        {
            checkClick = true;
            Animated.timing(fadeOutValue, 
            {
                toValue: 0.09,
                useNativeDriver: true,
                duration: 500,
            }).start();
        }
        else
        {
            checkClick = false;
            Animated.timing(fadeOutValue, 
            {
                toValue: 1.0,
                useNativeDriver: true,
                duration: 500,
            }).start();
        }
    };

    const blinkValue = useRef(new Animated.Value(1.0)).current;
    const blinkPress = () =>
    {
        Animated.sequence
        (
            [
                Animated.timing(blinkValue,
                {
                    toValue: 0.0,
                    useNativeDriver: true,
                    duration: 500,
                }),
                Animated.timing(blinkValue,
                {
                    toValue: 1.0,
                    useNativeDriver: true,
                    duration: 500,
                }),
            ]
        ).start();
    };

    const scale1Value = useRef(new Animated.Value(1.0)).current
    const currentScale = useRef(1);

    useEffect(() =>
    {
        const id = scale1Value.addListener(({ value }) =>
        {
            currentScale.current = value;
        });

        return () => scale1Value.removeListener(id);
    }, []);

    const scale1Press = () =>
    {
        let newScale = currentScale.current * 0.9;

        Animated.timing(scale1Value,
        {
            toValue: newScale,
            useNativeDriver: true,
            duration: 300,
        }).start();
    };

    const scale11Press = () =>
    {
        let newScale = currentScale.current * 1.5;

        Animated.timing(scale1Value,
        {
            toValue: newScale,
            useNativeDriver: true,
            duration: 300,
        }).start();
    };

    const scale2Value = useRef(new Animated.Value(1)).current;
    const scale2Press = () =>
    {
        Animated.timing(scale2Value, 
        {
            toValue: 1.5,
            useNativeDriver: true,
            duration: 300,
        }).start();
    };

    const liquidValue = useRef(new Animated.Value(1.0)).current;
    const liquidPress = () =>
    {
        Animated.sequence
        (
            [
                Animated.timing(liquidValue,
                {
                    toValue: 1.2,
                    useNativeDriver: true,
                    duration: 150,
                }),
                Animated.timing(liquidValue,
                {
                    toValue: 0.8,
                    useNativeDriver: true,
                    duration: 150,
                }),
                Animated.timing(liquidValue,
                {
                    toValue: 1.0,
                    useNativeDriver: true,
                    duration: 150,
                }),
            ]
        ).start();
    };

    const trans1xValue = useRef(new Animated.Value(0.0)).current;
    const trans1yValue = useRef(new Animated.Value(0.0)).current;
    const trans1Press = () =>
    {
        Animated.parallel([
            Animated.sequence
            (
                [
                    Animated.timing(trans1xValue,
                    {
                        toValue: 150.0,
                        useNativeDriver: true,
                        duration: 300,
                    }),
                    Animated.timing(trans1xValue,
                    {
                        toValue: -150.0,
                        useNativeDriver: true,
                        duration: 600,
                    }),
                    Animated.timing(trans1xValue,
                    {
                        toValue: 0.0,
                        useNativeDriver: true,
                        duration: 300,
                    }),
                ]
            ),
            Animated.sequence
            (
                [
                    Animated.timing(trans1yValue,
                    {
                        toValue: 50.0,
                        useNativeDriver: true,
                        duration: 150,
                    }),
                    Animated.timing(trans1yValue,
                    {
                        toValue: -50.0,
                        useNativeDriver: true,
                        duration: 300,
                    }),
                    Animated.timing(trans1yValue,
                    {
                        toValue: 50.0,
                        useNativeDriver: true,
                        duration: 300,
                    }),
                    Animated.timing(trans1yValue,
                    {
                        toValue: -50.0,
                        useNativeDriver: true,
                        duration: 300,
                    }),
                    Animated.timing(trans1yValue,
                    {
                        toValue: 0.0,
                        useNativeDriver: true,
                        duration: 150,
                    }),
                ]
            ) 
        ]).start();
    };

    const rot1Value = useRef(new Animated.Value(0.0)).current;

    const rot1Press = () =>
    {
        Animated.sequence
        (
            [
                Animated.timing(rot1Value,
                {
                    toValue: 45.0,
                    useNativeDriver: true,
                    duration: 300,
                }),
                Animated.timing(rot1Value,
                {
                    toValue: -45.0,
                    useNativeDriver: true,
                    duration: 600,
                }),
                Animated.timing(rot1Value,
                {
                    toValue: 0.0,
                    useNativeDriver: true,
                    duration: 300,
                }),
            ]
        ).start();
    };

    const fin1Value = useRef(new Animated.Value(1.0)).current;
    
    let isAnimating = useRef(false);

    const loopAnimRef = useRef<Animated.CompositeAnimation | null>(null);


    const fin1Press = () =>
    {
        if (isAnimating.current)
        {
            if (loopAnimRef.current)
            {
                loopAnimRef.current.stop();
            }

            isAnimating.current = false;

            Animated.timing(fin1Value,
            {
                toValue: 1.0,
                useNativeDriver: true,
                duration: 900,
            }).start();
        }
        else
        {
            isAnimating.current = true;

            loopAnimRef.current = Animated.loop
            (
                Animated.sequence
                ([
                    Animated.timing(fin1Value,
                    {
                        toValue: 1.5,
                        useNativeDriver: true,
                        duration: 900,
                    }),
                    Animated.timing(fin1Value,
                    {
                        toValue: 1.0,
                        useNativeDriver: true,
                        duration: 900,
                    }),
                ])
            );

            loopAnimRef.current.start();
        }
    };

    return <View style={AnimStyle.pageContainer}>
        <Text style={AnimStyle.title}>Animations</Text>

        <View style={AnimStyle.row}>
            <Pressable style={AnimStyle.anim} onPress={fadeOutPress}>
                <Animated.View style={[AnimStyle.block, {opacity: fadeOutValue}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Opacity</Text>
                </Animated.View>
            </Pressable>

           <Pressable style={AnimStyle.block} onPress={blinkPress}>
                <Animated.View style={[AnimStyle.block, {opacity: blinkValue}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Blink</Text>
                </Animated.View>
            </Pressable>
        </View>

        <View style={AnimStyle.row}>
            <Pressable style={AnimStyle.anim} onPress={scale1Press} onLongPress={scale11Press}>
                <Animated.View style={[AnimStyle.block, {transform: [{scale: scale1Value}]}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Scale</Text>
                </Animated.View>
            </Pressable>

           <Pressable style={AnimStyle.block} onPress={scale2Press}>
                <Animated.View style={[AnimStyle.block, {transform:[{scaleX: scale2Value}, {scaleY: scale2Value.interpolate({inputRange: [1, 1.5], outputRange: [1, 1 / 1.5]})},]}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Grounding</Text>
                </Animated.View>
            </Pressable>
        </View>

        <View style={AnimStyle.row}>
            <Pressable style={AnimStyle.anim} onPress={liquidPress}>
                <Animated.View style={[AnimStyle.block, {transform: [{scale: liquidValue}]}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Liquid touch</Text>
                </Animated.View>
            </Pressable>

            <Pressable style={AnimStyle.block} onPress={trans1Press}>
                <Animated.View style={[AnimStyle.block, {transform:[{translateX: trans1xValue}, {translateY: trans1yValue}, {scale: trans1xValue.interpolate({inputRange: [-50, 0, 50], outputRange:[0.75, 1, 1.33]})}]}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Inf</Text>
                </Animated.View>
            </Pressable>
        </View>

        <View style={AnimStyle.row}>
            <Pressable style={AnimStyle.block} onPress={rot1Press}>
                <Animated.View style={[AnimStyle.block, {transform:[{rotate: rot1Value.interpolate({inputRange: [-90, 0, 90], outputRange: ["-90deg", "0deg", "90deg"]})}, {translateX: rot1Value.interpolate({inputRange: [-90, 90], outputRange: [80, -80]})}]}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Rotation</Text>
                </Animated.View>
            </Pressable>

            <Pressable style={AnimStyle.block} onPress={fin1Press}>
                <Animated.View style={[AnimStyle.block, {transform:[{scale: fin1Value}]}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Loop</Text>
                </Animated.View>
            </Pressable>
        </View>
    </View>;
}