import React from 'react'

function Input({placeholder, onchange, value}) {
  return (
    <span className='border-2 border-black'>
        <input 
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onchange} />
    </span>
  )
}

export default Input