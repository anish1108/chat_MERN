import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Input from "../components/Input"
import { Userstore } from '../store/userStore'

function ChatField() {

    const resp = ["anish", "kumar", "prasad"]
    const [messages, setMessages] = useState([])
    const {receiver} = Userstore();

    async function messageHandler(){
        const userId = receiver._id
        console.log(`userid si ${userId}`)
        try {
            const response = await axios.get(`http://localhost:3000/messages/${userId}`,{
                withCredentials: true
            })
            console.log(`response is ${JSON.stringify(response.data)}`)
        } catch (error) {
            console.log("error is hrergghgh " + error)
        }
    }

    useEffect(() => {
      messageHandler();
    }, [])
    

  return (
    <div>
        <nav>
            {receiver.name}
        </nav>
        <div>
            chats
        </div>
        <div>
            <Input/>
        </div>
    </div>
  )
}

export default ChatField