import React from 'react'
import PropTypes from 'prop-types'
import { GlobalContext } from '../../store/GlobalStore'
import TimerListItem from './TimerListItem'

function TimerList(props) {

    //get all the timer objects
    //for each timer, render a card
  return (
    <GlobalContext.Consumer>
        {
            (store) => 
                
                <div className='flex flex-wrap justify-center'>
                {
                    store.timer.state.timers.map(timer => (
                        <TimerListItem timer={timer} key={timer.id}/>
                    )                       

                    )
                }
                
                </div>
        }
    </GlobalContext.Consumer>
  )
}

TimerList.propTypes = {

}

export default TimerList

