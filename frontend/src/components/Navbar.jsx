import React from 'react'
import { Userstore } from '../store/userStore'
import { IoIosArrowBack } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
{/* <IoChevronForward /> */}
{/* <IoIosArrowBack /> */}

function Navbar() {

  const { logoutHandler,toggleSidebar, isSidebarVisible } = Userstore()


  return (
    <div className='bg-[#232631] drop-shadow-xl/30 px-7 py-2 w-[80vw]  mx-[5vw]  rounded-2xl flex items-center justify-between '>
      <div className='flex gap-2'>
        <button className='md:hidden' onClick={toggleSidebar}>{isSidebarVisible? <IoIosArrowBack className='text-lg' />: <IoChevronForward className='text-lg'/>}</button>
        <div>Chat</div>
      </div>

      <div className='flex justify-end'>
        <button className='bg-blue-400 rounded-2xl w-18 h-10 hover:bg-blue-500' onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar