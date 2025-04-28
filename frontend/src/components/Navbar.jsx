import React from 'react'
import { Userstore } from '../store/userStore'

function Navbar() {

  const {currentsender} = Userstore()
  return (
    <div>
      Navbar
      {/* <div>
        
        
          {currentsender}
      </div> */}
    </div>
  )
}

export default Navbar