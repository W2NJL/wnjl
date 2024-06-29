import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PublicLayout from '../../layouts/public/PublicLayout'
import PreviewTimer from '../../containers/timer/PreviewTimer'
import { useGlobalContext } from '../../store/GlobalStore'
import BaseTimer from '../../containers/timer/BaseTimer'
import { TIMER_ACTIONS } from '../../store/TimerStore'
import RoundButton from '../../components/buttons/round-button/RoundButton'
import { Link } from 'react-router-dom'
import alarm from './../../assets/alarms.wav';
import piano from './../../assets/piano.mp3';

function Start(props) {

    const {timer: timerStore} = useGlobalContext();

    const timers = timerStore.state.timers; 

    const currentTimerIndex = timerStore.state.currentTimerIndex; 

    const currentTimer = timers[currentTimerIndex];

    const [hasStopped, setHasStopped] = useState(false); 

    const alarmBeep = new Audio(alarm);

    const pianoMan = new Audio(piano);

    function onStart(){
        setHasStopped(false);

    }

    function onFinish(){
        setTimeout(() => {
            pianoMan.play();
             const atTheEnd = currentTimerIndex === timers.length -1; 

        if(!atTheEnd){  return timerStore.dispatch({
            type: TIMER_ACTIONS.SET_TIMER_CURRENT_INDEX,
            payload: currentTimerIndex + 1,
        })}

      if(!timerStore.state.isInfinite){
        pianoMan.pause();
        alarmBeep.play();
        setHasStopped(true)
      }
      return timerStore.dispatch({
        type: TIMER_ACTIONS.SET_TIMER_CURRENT_INDEX,
        payload: 0 
      })
        })

        //check if at the end of the array
       

        //change current tiemr to next timer

        //if non left, then stop

        //check if isFinite === true
        //if yes, reset index = 0
        //if no, also 0
    }

    function onStop(){
        alarmBeep.pause();
        pianoMan.pause();
        setHasStopped(true);
        timerStore.dispatch({
            type: TIMER_ACTIONS.SET_TIMER_CURRENT_INDEX,
            payload: 0 
          });
    }

    function nextTimer(){
        if(currentTimerIndex === timers.length - 1){
            return timerStore.state.isInfinite ? timers[0] : null;
        }
        return timers[currentTimerIndex + 1];

    }

    const previewTimer = nextTimer();

  return (
    <PublicLayout>
        <div className='flex justify-center items-center' style={{height: '80vh'}}>{!hasStopped && (
    <div className='flex flex-col'> 
    
    {previewTimer &&   <PreviewTimer timer={previewTimer}></PreviewTimer>}
  

        {/* basetimer */}
        <BaseTimer
        autoplay={true}
        key={currentTimerIndex}
        onFinish={onFinish}
        onStart={onStart}
        onStop={onStop}
        timeout={currentTimer.duration}
        title={currentTimer.title}
        /></div>
)}

{hasStopped && (
    <div className='flex justify-center flex-col items-center'>
        <h1 className='text-6x'>All done!</h1>
        <Link to="/timer">
        <RoundButton>Back</RoundButton></Link>
    </div>
)}</div>

        {/* preview */}
       
      
    </PublicLayout>
  )
}

Start.propTypes = {

}

export default Start

