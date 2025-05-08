import React from 'react'
import { Userstore } from '../store/userStore'

function Navbar() {

  const {currentsender, logoutHandler} = Userstore()

  
  return (
    <div className='bg-[#232631] px-7 py-2 mx-20  rounded-2xl flex items-center justify-between '>
      <div>Chat</div>
      <div className='flex justify-end'>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar