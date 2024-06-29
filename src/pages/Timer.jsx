import React from 'react'
import PropTypes from 'prop-types'
import PublicLayout from '../layouts/public/PublicLayout'
import Tooltip from '../components/tooltip/Tooltip'
import TimerList from '../containers/timer/TimerList'
import OutlinedButton from '../components/buttons/outlined-button/OutlinedButton'
import Toggle from '../components/toggle/Toggle'
import { useGlobalContext } from '../store/GlobalStore'
import { TIMER_ACTIONS } from '../store/TimerStore'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'
import { convertMMSS } from '../utils/Utility'

function Timer(props) {

    const {timer: timerStore} = useGlobalContext();

    const timers = timerStore.state.timers; 

    const isInfinite = timerStore.state.isInfinite; 

function addTimer(){
timerStore.dispatch({
    type: TIMER_ACTIONS.SET_TIMERS,
    payload: [
        ...timers,
        {
            id: v4(),
            title: 'Hell No',
            duration: convertMMSS('00:30'),
        }
    ]
})
}

function onToggle(event){
    timerStore.dispatch({
        type: TIMER_ACTIONS.SET_IS_INFINITE,
        payload: event.target.checked, 
    })
}


  return (
    <PublicLayout>

        {/* {header} */}
        <h1 className='text-3xl text-center'>Timers

        <Tooltip tooltip="Add new timer">
            <button onClick={addTimer} className='px-5'>+</button>
        </Tooltip>
        </h1>
        {/* {cards} */}

        <TimerList/>



        {/* {start} */}
        <div className='flex justify-center items-center'>

            <Link to="/timer/start"><OutlinedButton>Start</OutlinedButton></Link>


<Toggle onChange={onToggle} value={isInfinite}>Loop Forever</Toggle>

        </div>
      
    </PublicLayout>
  )
}

Timer.propTypes = {

}

export default Timer

