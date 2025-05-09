import React from 'react'
import { Userstore } from '../store/userStore'

function Navbar() {

  const { logoutHandler} = Userstore()

  
  return (
    <div className='bg-[#232631] px-7 py-2  mx-[5vw]  rounded-2xl flex items-center justify-between '>
      <div>Chat</div>
      <div className='flex justify-end'>
        <button className='bg-blue-400 rounded-2xl w-18 h-10 hover:bg-blue-500' onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar