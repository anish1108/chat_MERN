import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Userstore } from '../store/userStore'
import { CgProfile } from "react-icons/cg";
import { axiosInstance } from '../utils/axios';

function ContactHolder() {
    // const resp = ["anish", "kumar", "prasad"]
    const [users, setUsers] = useState([])
    const { currentReceiver, receiver, toggleSidebar } = Userstore()

    async function contactLoader() {
        try {

            const response = await axiosInstance.get("/users", {
                withCredentials: true
            })
            if (!response) {
                console.log("not found")
                return
            }
            setUsers(response.data)
            // console.log(`users is ${JSON.stringify(response.data)}`)
        } catch (error) {
            console.log(error)
        }
    }

    const clickhandler = (user) => {
        currentReceiver(user);
        toggleSidebar()
    }

    useEffect(() => {
        contactLoader()
    }, [])

    useEffect(() => {
        // console.log(`current recier is ${JSON.stringify(receiver.name)}`)
        console.log(receiver.name)
    }, [receiver])

    return (
        <div className='bg-[#232631] h-[73vh] md:w-[20vw] w-[70vw] rounded-2xl m-4 p-4 shadow-xl/20 shadow-blue-400 overflow-y-scroll 
        [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
            <div >
                {
                    users.map((user, index) => {
                        return (
                            <div className=' flex items-center border-b border-[#3B3E46] rounded-2xl px-2 hover:cursor-pointer hover:bg-[#3B3E46]'
                            onClick={() => clickhandler(user)} key={index}>
                                <div className='text-3xl'> <CgProfile /></div>
                                <div className='  m-3 p py-2 ' key={user._id}
                                    
                                >{user.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default ContactHolder