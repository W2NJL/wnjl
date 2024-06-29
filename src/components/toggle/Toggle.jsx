import React, { useId } from 'react'
import css from './Toggle.module.scss';
import PropTypes from 'prop-types'

function Toggle({children, value, ...props}) {


    const uniqueId = useId();

  return (





  <label htmlFor={uniqueId} className="inline-flex relative items-center cursor-pointer">

<input className={`sibling:checked:bg-blue-600 sr-only ${css.input}`} type='checkbox' checked={value} {...props} id={uniqueId}/>


<div className={`w-11 h-6 bg-gray-200 rounded-full ${css.toggle}`}></div>
<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</span>

  </label>
  )
}

Toggle.propTypes = {
    value: PropTypes.bool

}

export default Toggle

