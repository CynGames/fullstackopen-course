import React from 'react'

const Button = ({buttonLabel, callback}) => {
  return (
    <button onClick={callback}>{buttonLabel}</button>
  )
}

export default Button