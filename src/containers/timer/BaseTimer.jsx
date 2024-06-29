import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import RoundButton from '../../components/buttons/round-button/RoundButton';
import ProgressBar from '../../components/progress-bar/ProgressBar';
import CountdownClock from './CountdownClock';

let timerId = null; 
function BaseTimer({timeout, onFinish, onStop, onStart, autoplay, title}) {

const [totalTime, setTotalTime] = useState(timeout);
const [isPausing, setIsPausing] = useState(false);
const [hasStarted, setHasStarted] = useState(false);

useEffect(() => {
    if(autoplay){
        startTimer();
    }
}, []); 



function pauseTimer(){
    setIsPausing(true);
    clearInterval(timerId);

}
function resumeTimer(){
    setIsPausing(false);
    startTimer();

}
function stopTimer(){
    setTotalTime(timeout);
    setHasStarted(false);
    setIsPausing(false);
    onStop();
    clearInterval(timerId); 

}

function startTimer(){
    setHasStarted(true);
    onStart();
    timerId = setInterval(() =>{

        setTotalTime((totalTime) => {

            const timeRemaining = totalTime - 1;

            if(timeRemaining<=0){
                clearInterval(timerId);
                onFinish();
                return 0; 
            }
            return timeRemaining; 
        })

    }, 1000); 
}

function getTimeRemainingPercent(){
    return Math.round((totalTime/timeout) * 100);
}

function renderButtons(){
    if(!hasStarted){
        return<RoundButton onClick={startTimer}>Start</RoundButton>
    }

    if(isPausing){
        
        return            (
                <div><RoundButton onClick={resumeTimer}>Play</RoundButton>
            <RoundButton onClick={stopTimer}>Stop</RoundButton></div>
        )
    }

    return(
        <div><RoundButton onClick={pauseTimer}>Pause</RoundButton>
            <RoundButton onClick={stopTimer}>Stop</RoundButton></div> 
    )
}

  return (
    <div className='flex justify-center' style={{width: 'fit-content'}}>

     <div className='flex flex-col mx-5' style={{width: '60vw'}}> 

     <div className='flex justify-between mb-4'>
        <span className='text-6xl'>{title}</span>
        <CountdownClock timeRemaining={totalTime}></CountdownClock>
        </div>   
        <ProgressBar percent={getTimeRemainingPercent()}></ProgressBar>
        </div> 
        <div className='flex flex-col items-center'>
{renderButtons()}
        </div>   

      
    </div>
  )
}

BaseTimer.propTypes = {
timeout: PropTypes.number,
onFinish: PropTypes.func,
onStop: PropTypes.func,
onStart: PropTypes.func,
autoplay: PropTypes.bool,
title: PropTypes.string
}

export default BaseTimer

