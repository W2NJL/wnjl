import { v4 } from "uuid";

const TIMER_ACTIONS = {
    SET_TIMERS: 'set-timers',
    SET_IS_INFINITE: 'set-is-infinite',
    SET_TIMER_CURRENT_INDEX: 'set-timer-current-index'
}

const timerStore = {
    timers:[
        {
            id: v4(),
            title: 'Workout',
            duration: 3, // in sec
        },
        {
            id: v4(),
            title: 'Rest',
            duration: 2, // in sec
        }
    ],
    isInfinite: true,
    currentTimerIndex: 0, 
}

function timerReducer(timerStore, action){
    switch(action.type){
        case TIMER_ACTIONS.SET_TIMERS:
          
            return{
                ...timerStore,
                timers: action.payload,
            }
            case TIMER_ACTIONS.SET_IS_INFINITE:
                return{
                    ...timerStore,
                    isInfinite: action.payload,
                }
                case TIMER_ACTIONS.SET_TIMER_CURRENT_INDEX:
                return{
                    ...timerStore,
                    currentTimerIndex: action.payload,
                }

    }
}


export{
    timerStore,
    TIMER_ACTIONS,
    timerReducer
}