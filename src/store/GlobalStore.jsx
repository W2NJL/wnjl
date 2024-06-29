import { createContext, useContext, useReducer } from "react";
import { timerReducer, timerStore } from "./TimerStore";

export const ACTIONS = {
    UPDATE_HEY: 'update-hey'
}

export function globalReducer(state, action){
console.log({state, action});

switch(action.type){
    case ACTIONS.UPDATE_HEY:
        return{
            ...state,
            hey: action.payload,
        }
        default: 
        return state 
}
}

export const GlobalContext = createContext();



export function GlobalProvider(props){
    const [state, dispatch] = useReducer(globalReducer,{hey: 'mate',});

    const [timerState, timerDispatch] = useReducer(timerReducer, timerStore)
    return(
        <GlobalContext.Provider {...props} value={{
            timer:{
                state: timerState,
                dispatch: timerDispatch,
            }
        }}></GlobalContext.Provider>
    )
}

export function useGlobalContext(){
    return useContext(GlobalContext);
}