import { createContext , useState } from "react";



export const CounterContext = createContext();


export default function CounterContextProvider({children}){
    const [counter, setcounter] = useState(0)
    return <CounterContext.Provider value={{counter : counter , setcounter : setcounter}}>
        {children}
    </CounterContext.Provider>
        



}