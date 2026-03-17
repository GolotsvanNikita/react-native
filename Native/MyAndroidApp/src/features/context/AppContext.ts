import { createContext } from "react";
import IRoute from "../model/IRoute";

interface IAppContex
{
    navigate: (route:IRoute) => void,
};

const initValue:IAppContex =
{
    navigate: _ => {throw "navigate() isn`t implemented";},
}

const AppContext = createContext<IAppContex>(initValue);

export {AppContext};