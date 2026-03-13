import { Text, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";
import { useState } from "react";
import { CalcOperations } from "./model/CalcOperations";
import MemoryButton from "./ui/MemoryButton";
import { MemoryButtonTypes } from "./model/MemoryButtonTypes";

const maxDigits = 20;
const dotSymbol = ',';
const minusSymbol = '\u2212';

interface ICalcState
{
    expression: string,
    result: string,
    isNeedClear: boolean,
    operation?: CalcOperations,
    prevArgument?: number,
    isNeedClearEntry: boolean,
    memoryStatuses: { [key: string]: MemoryButtonTypes },
};

const initCaclState:ICalcState =
{
    expression: '',
    result: '0',
    isNeedClear: true,
    isNeedClearEntry: false,
    memoryStatuses:
    {
        "MC": MemoryButtonTypes.disabled,
        "MR": MemoryButtonTypes.disabled,
        "M+": MemoryButtonTypes.disabled,
        "M-": MemoryButtonTypes.disabled,
        "MS": MemoryButtonTypes.disabled,
        "Mv": MemoryButtonTypes.disabled,
    },
};

export default function Calc() {
    const [calcState, setCalcState] = useState<ICalcState>(initCaclState);
    const equalClick = () =>
    {
        let oper = String(calcState.operation);

        let resOp;

        if (!calcState.operation) return;

        switch(oper)
        {
            case CalcOperations.add:
                resOp = calcState.prevArgument! + resToNum(calcState.result);
                break;
            case CalcOperations.div:
                resOp = calcState.prevArgument! / resToNum(calcState.result);
                break;
            case CalcOperations.mul:
                resOp = calcState.prevArgument! * resToNum(calcState.result);
                break;
            case CalcOperations.sub:
                resOp = calcState.prevArgument! - resToNum(calcState.result);
                break;
            default:
                resOp = NaN;
                break;
        }

        setCalcState({...calcState,
            result: numToRes(resOp),
            expression: `${calcState.expression} ${calcState.result} = `,
            operation: undefined,
            prevArgument: undefined,
            isNeedClear: true,
        })
    }

    const operButtonClick = (oper:CalcOperations, symbol:string) =>
    {
        setCalcState({...calcState,
            operation: oper,
            expression: `${calcState.result} ${symbol}`,
            prevArgument: resToNum(calcState.result),
            isNeedClearEntry: true,
        })
    };

    const resToNum = (res:string):number =>
    {
        return Number
        (
            res
            .replace(dotSymbol, '.')
            .replace(minusSymbol, '-')
        );
    };

    const numToRes = (num:number):string =>
    {
        return num.toString()
            .replace('.', dotSymbol)
            .replace('-', minusSymbol);
    };

    const invClick = () =>
    {
        let arg = resToNum(calcState.result);
        if (arg != 0.0)
        {
            arg = 1.0 / arg;
        }
        
        setCalcState({...calcState,
            result: numToRes(arg),
            expression: `1 / ${calcState.result} = `,
            isNeedClear: true,
        });
    };

    const digitClick = (text:string) =>
    {
        let res = calcState.result;
        if (res == '0' || calcState.isNeedClear || calcState.isNeedClearEntry)
        {
            res = '';
        }
        if (calcState.result.length < maxDigits + (res.includes(dotSymbol) ? 1 : 0))
        {
            res += text;
        }

        setCalcState({...calcState,
            result: res,
            expression: calcState.isNeedClear ? "" : calcState.expression,
            isNeedClear: false,
            isNeedClearEntry: false,
        })
    };

    const backspaceClick = (text:string) =>
    {
        let len = calcState.result.length;
        let res = len > 1 ? calcState.result.substring(0, len - 1) : "0";

        if (calcState.result.includes(minusSymbol) && len == 2)
        {
            setCalcState({...calcState,
                result: res,
            })
        }
    };

    const dotClick = (text: string) =>
    {
        if (!calcState.result.includes(','))
        {
            setCalcState({...calcState,
                result: calcState.result + text,
            });
            if (!(calcState.result.length == maxDigits))
            {
                setCalcState({...calcState,
                    result: calcState.result + ',',
                });
            }
        }
    };

    const plusMinClick = (text:string) =>
    {
        if (calcState.result == '0') return;

        if (calcState.result.startsWith(minusSymbol))
        {
            setCalcState({...calcState,
                result: calcState.result.substring(1),
            });
        }
        else
        {
            setCalcState({...calcState,
                result: minusSymbol + calcState.result,
            });
        }
    };

    const clearEntryClick = () =>
    {
        setCalcState({...calcState,
            result: '0',
        });
    }

    const changeType = (text: string) =>
    {
        const currentStatus = calcState.memoryStatuses[text];

        const newStatus = currentStatus === MemoryButtonTypes.disabled
            ? MemoryButtonTypes.enabled
            : MemoryButtonTypes.disabled;

        setCalcState({...calcState,
            memoryStatuses:
            {
                ...calcState.memoryStatuses,
                [text]: newStatus,
            },
        });
    }

    const del = (text:string) =>
    {
        setCalcState(initCaclState);
    };

    const resultFontSize = calcState.result.length <= 11 ? 60.0 : 660 / calcState.result.length;

    return <View style={CalcStyle.pageContainer}>
        <Text style={CalcStyle.pageTitle}>Calculator</Text>
        <Text style={CalcStyle.expression}>{calcState.expression}</Text>
        <Text style={[CalcStyle.result, {fontSize: resultFontSize}]}>{calcState.result}</Text>
        <View style={CalcStyle.memoryRow}>
            {["MC", "MR", "M+", "M-", "MS", "Mv"].map((btnText) =>
                (
                    <MemoryButton
                        key={btnText}
                        text={btnText}
                        type={calcState.memoryStatuses[btnText]}
                        onPress={() => changeType(btnText)}
                     />
                ))}
        </View>

        <View style={CalcStyle.keyboard}>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text="%" />
                <CalcButton text="CE" onPress={clearEntryClick}/>
                <CalcButton text="C" onPress={del}/>
                <CalcButton text={"\u232B"} onPress={backspaceClick}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u00b9/\u2093"} onPress={invClick} />
                <CalcButton text={"x\u00b2"} />
                <CalcButton text={"\u00B2\u221ax\u0305"} />
                <CalcButton text={"\u00F7"} onPress={(face) => operButtonClick(CalcOperations.div, face)}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00D7"} onPress={(face) => operButtonClick(CalcOperations.mul, face)}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u2212"} onPress={(face) => operButtonClick(CalcOperations.sub, face)}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\uFF0B"} onPress={(face) => operButtonClick(CalcOperations.add, face)} />
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u207a\u2215\u208b"} buttonType={CalcButtonTypes.digit} onPress={plusMinClick} />
                <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={dotSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick} />
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} onPress={equalClick} />
            </View>
        </View>
    </View>;
}
