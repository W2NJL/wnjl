import React from 'react'
import PropTypes from 'prop-types'
import css from './RoundButton.module.scss';


function RoundButton({children, ...attr}) {
  return (
  <button className={css.roundButton} {...attr}>{children}</button>
  )
}

RoundButton.propTypes = {}

export default RoundButton