import React from 'react'
import { Userstore } from '../store/userStore'

function Navbar() {

  const {currentsender, logoutHandler} = Userstore()

  
  return (
    <div>
      Navbar
      <div className='flex justify-end'>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar