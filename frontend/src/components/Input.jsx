import React from 'react'

function Input({placeholder, onChange, value}) {
  return (
    <span className='border-2 border-black'>
        <input 
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange} />
    </span>
  )
}

export default Input