import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Userstore } from '../store/userStore'
import { CgProfile } from "react-icons/cg";

function ContactHolder() {
    // const resp = ["anish", "kumar", "prasad"]
    const [users, setUsers] = useState([])
    // const [receiver, setReceiver] = useState(null)

    const { currentReceiver, receiver } = Userstore()

    async function contactLoader() {
        try {

            const response = await axios.get("http://localhost:3000/users", {
                withCredentials: true
            })
            if (!response) {
                console.log("not found")
                return
            }
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const clickhandler = (user) => {
        currentReceiver(user);
    }

    useEffect(() => {
        contactLoader()
    }, [])

    useEffect(() => {
        // console.log(`current recier is ${JSON.stringify(receiver.name)}`)
        console.log(receiver.name)
    }, [receiver])

    return (
        <div className='bg-[#232631] h-[85vh] rounded-2xl m-4  p-4'>
            <div >
                {
                    users.map((user) => {
                        return (
                            <div className='flex items-center border-b border-[#3B3E46] hover:cursor-grab'
                            onClick={() => clickhandler(user)}>
                                <div className='text-3xl'> <CgProfile /></div>
                                <div className='  m-3 px-2 py-2 ' key={user._id}
                                    
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