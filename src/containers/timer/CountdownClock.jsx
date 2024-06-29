import React from 'react'
import PropTypes from 'prop-types'

function CountdownClock({timeRemaining}) {
    const minutes = Math.floor(timeRemaining/60);
    const seconds = timeRemaining % 60; 
  return (
    <div>
      <h1 className='text-center text-6xl font-medium'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
    </div>
  )
}

CountdownClock.propTypes = {
timeRemaining: PropTypes.number
}

export default CountdownClock

