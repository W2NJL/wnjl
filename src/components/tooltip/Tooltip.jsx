import React from 'react'
import PropTypes from 'prop-types'
import css from './Tooltip.module.scss';

function Tooltip({tooltip, children, ...props}) {
  return (
    <span className={css.tooltip}
    data-tooltip={tooltip}
    {...props}>

        {children}
    </span>
  
  )
}

Tooltip.propTypes = {
tooltip: PropTypes.string
}

export default Tooltip

