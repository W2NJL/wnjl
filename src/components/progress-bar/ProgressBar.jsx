import React from 'react'
import PropTypes from 'prop-types'

function ProgressBar({percent = 100}) {
  return (
    <div className='w-full bg-gray-200 rounded h-2.5'>
      <div className='bg-blue-600 h-2.5 rounded-full'
      style={{
        width: percent + '%'
      }}/>
    </div>
  )
}

ProgressBar.propTypes = {
percent: PropTypes.number
}

export default ProgressBar

