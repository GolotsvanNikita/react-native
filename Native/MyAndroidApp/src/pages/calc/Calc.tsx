import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";
import { use, useState } from "react";
import { CalcOperations } from "./model/CalcOperations";
import MemoryButton from "./ui/MemoryButton";
import { MemoryButtonTypes } from "./model/MemoryButtonTypes";
import IRoute from "../../features/model/IRoute";

const maxDigits = 20;
const dotSymbol = ',';
const minusSymbol = '\u2212';
const spaceSymbol = '\u2009';

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

const startPage:IRoute = 
{
    slug: 'home',
};

export default function Calc() {
    const [calcState, setCalcState] = useState<ICalcState>(initCaclState);

    const {width, height} = useWindowDimensions();
    const [page, setPage] = useState<IRoute>(startPage);

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
                .replace(new RegExp(spaceSymbol, 'g'), '')
                .replace(dotSymbol, '.')
                .replace(minusSymbol, '-')
        );
    };

    const numToRes = (num:number):string =>
    {
        const res = num.toString()
            .replace('.', dotSymbol)
            .replace('-', minusSymbol);

        return applyFormatting(res);
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

    const digitClick = (text: string) =>
    {
        let res = calcState.result;

        if (res === '0' || calcState.isNeedClear || calcState.isNeedClearEntry)
        {
            res = '';
        }

        if (getDigitCount(res) < maxDigits)
        {
            res += text;
            res = applyFormatting(res);
        }

        setCalcState({...calcState,
            result: res,
            expression: calcState.isNeedClear ? "" : calcState.expression,
            isNeedClear: false,
            isNeedClearEntry: false,
        });
    };

    const backspaceClick = () =>
    {
        if (calcState.result === "0") return;

        let res = calcState.result.slice(0, -1);

        let cleanRes = res.replace(new RegExp(spaceSymbol, 'g'), '');

        if (cleanRes === "" || cleanRes === minusSymbol)
        {
            res = "0";
        }
        else 
        {
            res = applyFormatting(res);
        }

        setCalcState({ ...calcState,
            result: res,
        });
    };

    const dotClick = (text: string) =>
    {
        if (!calcState.result.includes(text))
        {
            let res = (calcState.isNeedClear || calcState.isNeedClearEntry) 
                    ? "0" + text 
                    : calcState.result + text;
            
            setCalcState({...calcState,
                result: applyFormatting(res),
                isNeedClear: false,
                isNeedClearEntry: false,
            });
        }
    };
    const plusMinClick = (text:string) =>
    {
        if (calcState.result == '0') return;

        if (calcState.isNeedClear) 
        {
            backspaceClick();
            return;
        }

        if (calcState.isNeedClearEntry) 
        {
            clearEntryClick();
            return;
        }

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

    const cosX = () =>
    {
        let res = Math.cos(Number(calcState.result));
        let resSt = String(res);
        setCalcState({...calcState,
            result: resSt,
        });
    }

    const sinX = () =>
    {
        let res = Math.sin(Number(calcState.result));
        let resSt = String(res);
        setCalcState({...calcState,
            result: resSt,
        });
    }

    const tanX = () =>
    {
        let res = Math.tan(Number(calcState.result));
        let resSt = String(res);
        setCalcState({...calcState,
            result: resSt,
        });
    }

    const ctgX = () =>
    {
        let res = Math.cos(resToNum(calcState.result)) / Math.sin(resToNum(calcState.result));
        let resSt = String(res);
        setCalcState({...calcState,
            result: resSt,
        });
    }

    const getDigitCount = (text: string) =>
    {
        return text.replace(new RegExp(`[${minusSymbol}${dotSymbol}${spaceSymbol}]`, 'g'), '').length;
    };

    const applyFormatting = (text: string) =>
    {
        let cleanStr = text.replace(new RegExp(spaceSymbol, 'g'), '');
        
        const parts = cleanStr.split(dotSymbol);
        
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, spaceSymbol);
        
        return parts.join(dotSymbol);
    };

    const numToSquare = () =>
    {
        let res = numToRes(resToNum(calcState.result) * resToNum(calcState.result));

        if (calcState.result.includes(minusSymbol))
        {
            res = minusSymbol + res;
        }

        setCalcState({...calcState,
            result: res,
            expression: calcState.result + '\u00b2',
            isNeedClear: false,
            isNeedClearEntry: false,
        });
    };

    const numToSquareRoot = () =>
    {
        let res = calcState.result.includes(minusSymbol) || calcState.result === '0'
            ? calcState.result
            : numToRes(Math.sqrt(resToNum(calcState.result)));
        
        setCalcState({...calcState,
            result: res,
            expression: calcState.result.includes(minusSymbol) || calcState.result === '0'
             ? '' 
             : `\u00B2\u221a${calcState.result}`,
        });
    }

    const resultFontSize = calcState.result.length <= 11 ? 60.0 : 660 / calcState.result.length;

    const PortraitView = () => <View style={CalcStyle.pageContainer}>

        <View style={CalcStyle.display}>
            <Text style={CalcStyle.pageTitle}>Calculator</Text>
            <Text style={CalcStyle.expression}>{calcState.expression}</Text>
            <Text style={[CalcStyle.result, {fontSize: resultFontSize}]}>{calcState.result}</Text>
        </View>

        <View style={CalcStyle.keyboard}>
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
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text="%" />
                <CalcButton text="CE" onPress={clearEntryClick}/>
                <CalcButton text="C" onPress={del}/>
                <CalcButton text={"\u232B"} onPress={backspaceClick}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u00b9/\u2093"} onPress={invClick} />
                <CalcButton text={"x\u00b2"} onPress={numToSquare}/>
                <CalcButton text={"\u00B2\u221ax\u0305"} onPress={numToSquareRoot} />
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

    const LandscapeView = () => <View style={CalcStyle.pageContainer}>
        <View style={CalcStyle.displayLand}>
            <View style={CalcStyle.displayLeftLand}>
                <Text style={CalcStyle.pageTitle}>Calculator</Text>
                <Text style={CalcStyle.expression}>{calcState.expression}</Text>

                <View style={CalcStyle.memoryRowLand}>
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
            </View>
            <Text style={[CalcStyle.resultLand, {fontSize: resultFontSize}]}>{calcState.result}</Text>
        </View>
        <View style={CalcStyle.keyboardLand}>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text="cosx" onPress={cosX}/>
                <CalcButton text="%" />
                <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00F7"} onPress={(face) => operButtonClick(CalcOperations.div, face)}/>
                <CalcButton text="C" onPress={del}/>
            </View>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text="sinx" onPress={sinX}/>
                <CalcButton text={"\u00b9/\u2093"} onPress={invClick} />
                <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00D7"} onPress={(face) => operButtonClick(CalcOperations.mul, face)}/>
                <CalcButton text="CE" onPress={clearEntryClick}/>
            </View>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text="tanx" onPress={tanX}/>
                <CalcButton text={"\u00B2\u221ax\u0305"} onPress={numToSquareRoot} />
                <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u2212"} onPress={(face) => operButtonClick(CalcOperations.sub, face)}/>
                <CalcButton text={"\u232B"} onPress={backspaceClick}/>
            </View>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text="ctgx" onPress={ctgX}/>
                <CalcButton text={"x\u00b2"} onPress={numToSquare}/>
                <CalcButton text={"\u207a\u2215\u208b"} buttonType={CalcButtonTypes.digit} onPress={plusMinClick} />
                <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={dotSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick} />
                <CalcButton text={"\uFF0B"} onPress={(face) => operButtonClick(CalcOperations.add, face)} />
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} onPress={equalClick} />
            </View>
        </View>
    </View>;

    return width < height ? PortraitView() : LandscapeView();
}

function PortraitView()
{

}

function LandscapeView()
{

}