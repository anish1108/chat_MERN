import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Userstore } from '../store/userStore'

function ContactHolder() {
    // const resp = ["anish", "kumar", "prasad"]
    const [users, setUsers] = useState([])
    // const [receiver, setReceiver] = useState(null)

    const {currentReceiver, receiver} = Userstore()

    async function contactLoader(){
        try {
            
            const response = await axios.get("http://localhost:3000/users",{
                withCredentials: true
            })
            if(!response){
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

    useEffect(()=>{
        // console.log(`current recier is ${JSON.stringify(receiver.name)}`)
        console.log(receiver.name)
    }, [receiver])
    
  return (
    <div>
        {
            users.map((user)=>{
                return (<div className='bg-amber-100 border-2 border-green-500 rounded-sm m-1.5 px-1 ' key={user._id}
                    onClick={() => clickhandler(user)}
                >{user.name}
                </div>)
            })
        }
    </div>
  )
}

export default ContactHolder