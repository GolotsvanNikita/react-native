import { Text, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";
import { useState } from "react";

const maxDigits = 20;
const dotSymbol = ',';
const minusSymbol = '-';

export default function Calc() {
    const [expression, setExpression] = useState<string>("");
    const [result, setResult] = useState<string>("0");

    const digitClick = (text:string) =>
    {
        let res = result;
        if (res == '0')
        {
            res = '';
        }
        if (result.length < maxDigits + (res.includes(dotSymbol) ? 1 : 0))
        {
            res += text;
        }
        setResult(res);
    };

    const backspaceClick = (text:string) =>
    {
        let len = result.length;
        setResult(len > 1 ? result.substring(0, len - 1) : "0");

        if (result.includes(minusSymbol) && len == 2)
        {
            setResult('0');
        }
    }

    const dotClick = (text: string) =>
    {
        if (!result.includes(','))
        {
            setResult(result + text);
            if (!(result.length == maxDigits))
            {
                setResult(result + ',');
            }
        }
    }

    const plusMinClick = (text:string) =>
    {
        if (result == '0') return;

        if (result.startsWith(minusSymbol))
        {
            setResult(result.substring(1))
        }
        else
        {
            setResult(minusSymbol + result);
        }
    }

    const del = (text:string) =>
    {
        let res = result;
        res = '0';
        setResult(res);
    }

    const resultFontSize = result.length <= 11 ? 60.0 : 660 / result.length;

    return <View style={CalcStyle.pageContainer}>
        <Text style={CalcStyle.pageTitle}>Calculator</Text>
        <Text style={CalcStyle.expression}>{expression}</Text>
        <Text style={[CalcStyle.result, {fontSize: resultFontSize}]}>{result}</Text>
        <View style={CalcStyle.memoryRow}>
            <Text>Memory buttons</Text>
        </View>

        <View style={CalcStyle.keyboard}>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text="%" />
                <CalcButton text="CE" />
                <CalcButton text="C" onPress={del}/>
                <CalcButton text={"\u232B"} onPress={backspaceClick}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u00b9/\u2093"} />
                <CalcButton text={"x\u00b2"} />
                <CalcButton text={"\u00B2\u221ax\u0305"} />
                <CalcButton text={"\u00F7"} />
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00D7"} />
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u2212"} />
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\uFF0B"} />
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u207a\u2215\u208b"} buttonType={CalcButtonTypes.digit} onPress={plusMinClick} />
                <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={dotSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick} />
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} onPress={digitClick} />
            </View>
        </View>
    </View>;
}
