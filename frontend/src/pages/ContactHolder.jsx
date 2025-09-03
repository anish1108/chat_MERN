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

    const contact_clickhandler = (user) => {
        currentReceiver(user);
        toggleSidebar()
    }

    const profile_clickhandler = (user) => {
        alert("hello"+ user)
    }

    useEffect(() => {
        contactLoader()
    }, [])

    useEffect(() => {
        // console.log(`current recier is ${JSON.stringify(receiver.name)}`)
        console.log(receiver.name) 
    }, [receiver])

    return (
        <div className='bg-[#2F3640] h-[73vh] md:w-[20vw] w-[70vw] rounded-2xl m-4 p-4 shadow-sm/20 shadow-[#4AD8C5] overflow-y-scroll 
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
                        const isActive = receiver && receiver._id === user._id;
                        return (
                            <div className={` flex items-center border-b border-[#3B3E46] rounded-2xl px-2 hover:cursor-pointer 
                                ${isActive ? "bg-[#4AD8C5] hover:bg-[#4AD8C5]" : "bg-[#2a323d] hover:bg-[#4ad8c509]"}`}
                                >
                                <div className='text-3xl'key={user._id} onClick={() => profile_clickhandler(user)}> <CgProfile/></div>
                                <div className='  m-3 p py-2 ' key={user._id} onClick={() => contact_clickhandler(user)} 
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