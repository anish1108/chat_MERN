import React from 'react'

function Button({name, onclick, type}) {
  return (
    <div>
        <button
        className='border-2 border-solid border-gray-400 w-14 h-8 hover:cursor-grab bg-black text-white rounded-sm text-sm '
         type={type} onClick={onclick}>{name}</button>
    </div>
  )
}

export default Button