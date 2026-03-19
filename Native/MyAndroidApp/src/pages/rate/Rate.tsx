import { Text, TouchableOpacity, View } from "react-native";
import RateStyle from "./ui/RateStyle";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import INbuRate from "../../entities/NbuRate/model/INbuRate";
import NbuRateApi from "../../entities/NbuRate/api/NbuRateApi";
import DatePicker from "react-native-date-picker";

export default function Rate()
{
    const [rates, setRates] = useState<Array<INbuRate>>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState(false)

    useEffect(() => 
    {
        NbuRateApi.getCurrentRates().then(setRates);
    }, []);

    return <View style={RateStyle.pageContainer}>
        <View>
            <Text style={RateStyle.pageTitle}>Exchange rates of the NBU</Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
        </View>

        <ScrollView>
            {rates.map((rate, index) =>
            (
                <View key={rate.cc} style={RateStyle.rateLine}>  
                    <Text style={[RateStyle.rateCc, index % 2 !== 0 && RateStyle.rateCcAlt]}>
                        {rate.cc}
                    </Text>
                    <Text style={[RateStyle.rateTxt, index % 2 !== 0 && RateStyle.rateTxtAlt]}>
                        {rate.txt}
                    </Text>
                    <Text style={[RateStyle.rateRate, index % 2 !== 0 && RateStyle.rateRateAlt]}>
                        {rate.rate}
                    </Text>
                </View>
            ))}            
        </ScrollView>

        <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={(date) =>
            {
                setOpen(false)
                setDate(date)
            }}
            onCancel={() =>
            {
                setOpen(false)
            }}
      />
    </View>;
}