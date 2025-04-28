import React from 'react'

function Button({name, onclick, type}) {
  return (
    <div>
        <button
        className='border-2 border-solid border-black'
         type={type} onClick={onclick}>{name}</button>
    </div>
  )
}

export default Button