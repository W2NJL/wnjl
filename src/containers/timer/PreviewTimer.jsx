import React from 'react'
import PropTypes from 'prop-types'

function PreviewTimer({timer}) {
  return (
    <div className='px-5 mb-4'>
        <h1 className='text-5xl text-gray-400 opacity-80'>
            <span className='text-3xl'>Up next: </span>
            {timer.title}</h1>
      {/* timer title */}
      {/* timer duration */}
      <p className='text-gray-500 opacity-80 text-xl'>Duration: {timer.duration} sec</p>
    </div>
  )
}

PreviewTimer.propTypes = {

}

export default PreviewTimer

