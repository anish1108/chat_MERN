import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Input from "../components/Input"
import Button from "../components/Button"
import { Userstore } from '../store/userStore'

function ChatField() {

    const resp = ["anish", "kumar", "prasad"]
    const [message, setMessage] = useState("")
    const {receiver, allmessages, sendMessage} = Userstore();

    const sendMessagehandler = (e)=>{
        e.preventDefault()
        console.log(`all messagfe ais ${allmessages}`)
        sendMessage(message);
    }
    

  return (
    <div>
        <nav>
            {/* {receiver.name} */}
            name
        </nav>
        <div>
            
            {
                allmessages.map((message)=>{
                    return ( <div key={Math.random()}>{message}</div> )
                })
            }
        </div>
        <div>
            <Input placeholder={"Enter Message"} value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
            <Button name={"Send"} type={"submit"} onclick={sendMessagehandler}/>
        </div>
    </div>
  )
}

export default ChatField