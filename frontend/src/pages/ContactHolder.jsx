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

    useEffect(() => {
      contactLoader()
    }, [])

    useEffect(()=>{
        console.log(`current recier is ${receiver}`)
    }, [currentReceiver])
    
  return (
    <div>
        {
            users.map((user)=>{
                return (<div key={user._id}
                    onClick={() => currentReceiver(user)}
                >{user.name}
                </div>)
            })
        }
    </div>
  )
}

export default ContactHolder