import { Text, View } from "react-native";
import ErrorPageStyle from "./ui/ErrorPageStyle";

export default function ErrorPage()
{
    return <View style={ErrorPageStyle.pageContainer}>
        <Text style={ErrorPageStyle.mainText}>404</Text>
        <Text style={ErrorPageStyle.nfText}>Not Found</Text>
    </View>
}