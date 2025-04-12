import React from 'react'

function Button({name, onclick, type}) {
  return (
    <div>
        <button type={type} onClick={onclick}>{name}</button>
    </div>
  )
}

export default Button