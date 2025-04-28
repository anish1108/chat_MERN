import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Input from "../components/Input"
import Button from "../components/Button"
import { Userstore } from '../store/userStore'

function ChatField() {

    const resp = ["anish", "kumar", "prasad"]
    const [message, setMessage] = useState("")
    const {receiver, allmessages, sendMessage, currentReceiver, restoreMessages} = Userstore();

    const sendMessagehandler = (e)=>{
        e.preventDefault()
        console.log(`all messagfe ais ${allmessages}`)
        sendMessage(message);
        setMessage("")
    }

    useEffect(() => {
      if(receiver){
        console.log(`fetching message of ${receiver.name}`)
        restoreMessages();
      }
    }, [receiver])
    

  return (
    <div>
        <nav>
            {receiver.name}
            
        </nav>
        <div>
            {
                allmessages.length > 0 ? (
                    allmessages.map((msg, index)=>(
                        <div key={index}>{msg}</div> 
                    ))
                ) : (
                    <p>No messages</p>
                )
            }
        </div>
        <div className='flex'>
            <Input placeholder={"Enter Message"} value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
            <Button name={"Send"} type={"submit"} onclick={sendMessagehandler}/>
        </div>
    </div>
  )
}

export default ChatField