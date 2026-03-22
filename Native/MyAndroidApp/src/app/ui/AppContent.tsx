import { BackHandler, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AppContentStyle from "./AppContentStyle";
import Home from "../../pages/home/Home";
import { useEffect, useState } from "react";
import IRoute from "../../features/model/IRoute";
import Calc from "../../pages/calc/Calc";
import ErrorPage from "../../pages/404/ErrorPage";
import HomeMain from "../../pages/homeMain/HomeMain";
import { AppContext } from "../../features/context/AppContext";
import Rate from "../../pages/rate/Rate";
import Anim from "../../pages/anim/Anim";

const startPage:IRoute = {
    slug: 'home',
};

export default function AppContent() {
    const [history, setHistory] = useState<Array<IRoute>>([]);
    const [page, setPage] = useState<IRoute>(startPage);
    const {width, height} = useWindowDimensions();

    const navigate = (route:IRoute):void => {
        if(route.slug == "-1") {
            // console.log(`history.length = ${history.length}`);
            if(history.length > 0) {
                const prevPage = history.pop();
                setPage(prevPage!);
                setHistory(history);
            }
            else {
                BackHandler.exitApp();
                // console.log("BackHandler.exitApp();")
            }
        }
        else if(route.slug != page.slug) {
            // Перехід на нову сторінку - збереження поточної
            // сторінки в історії та зміна поточної сторінки
            setHistory([...history, page]);
            setPage(route);
        }
    };

    useEffect(() => {
        const handler = BackHandler.addEventListener(
            'hardwareBackPress', () => {
                // console.log("back press");
                navigate({slug: '-1'});
                return true;
            });
        return () => handler.remove();    
    }, [history]);

    useEffect(() => {console.log(history)}, [history]);

    return <AppContext.Provider value={{navigate}}>
        <View style={AppContentStyle.container}>
            { width < height &&
                <View style={AppContentStyle.topBar}>
                        <TouchableOpacity onPress={() => navigate({slug: '-1'})}>
                            <Text style={AppContentStyle.topBarBack}>
                                &lt;
                            </Text>    
                        </TouchableOpacity>
                        <Text style={AppContentStyle.topBarTitle}>Mobile-P33</Text>
                    <View style={AppContentStyle.topBarIcon}></View>
                </View>
            }

            <View style={AppContentStyle.pageWidget}>
                { page.slug == "home" ? <Home />
                : page.slug == "calc" ? <Calc />
                : page.slug == "homeMain" ? <HomeMain />
                : page.slug == "rate" ? <Rate />
                : page.slug == "anim" ? <Anim />
                : <ErrorPage />
                }
            </View>        

            { width < height &&
                <View style={AppContentStyle.bottomBar}>
                    <TouchableOpacity onPress={() => navigate({slug: 'homeMain'})}>
                        <Image style={AppContentStyle.bottomBarIcon} 
                            source={require('../../features/asset/home.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate({slug: 'calc'})}>
                        <Image style={AppContentStyle.bottomBarIcon} 
                            source={require('../../features/asset/calc.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate({slug: 'rate'})}>
                        <Image style={AppContentStyle.bottomBarIcon} 
                            source={require('../../features/asset/rate.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate({slug: 'anim'})}>
                        <Image style={AppContentStyle.bottomBarIcon} 
                            source={require('../../features/asset/calc.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate({slug: 'homeMain'})}>
                        <Image style={AppContentStyle.bottomBarIcon} 
                            source={require('../../features/asset/home.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate({slug: '404'})}>
                        <Image style={AppContentStyle.bottomBarIcon} 
                            source={require('../../features/asset/404.png')}/>
                    </TouchableOpacity>
                </View>
            }
        </View>
    </AppContext.Provider>
}
/*
Д.З. Створити сторінку "404", додати кнопку меню, що імітує
перехід на неіснуючу сторінку. 
*/