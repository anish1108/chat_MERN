import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Input from "../components/Input"
import Button from "../components/Button"
import { Userstore } from '../store/userStore'

function ChatField() {

    const resp = ["anish", "kumar", "prasad"]
    const [message, setMessage] = useState("")
    const { receiver, allmessages, sendMessage, currentReceiver, restoreMessages, socket } = Userstore();

    const sendMessagehandler = async (e) => {
        e.preventDefault()
        const res = await sendMessage(message);
        Userstore.setState((state) => ({
            allmessages: [...state.allmessages, res.data]
        }))
        setMessage("")
        let data = res.data;
        socket.emit("newMessage", {
            data,
        })
    }

    useEffect(() => {

        const handleReceiveMsg = (data) => {
            console.log(`received message ${JSON.stringify(data)}`)
            Userstore.setState((state) => ({
                allmessages: [...state.allmessages, data.data]
            }))
        }
        if (socket) {
            socket.on("receiveMsg", handleReceiveMsg);
            return () => {
                socket.off("receiveMsg", handleReceiveMsg)
            }
        }
    }, [socket])


    return (
        <div className='grid content-between h-screen p-2'>
            <nav>

                {` ${receiver.name}`}


            </nav>
            <div  >
                {
                    allmessages.length > 0 ? (
                        allmessages.map((msg, index) => (

                            <div className='bg-green-100 border-2 border-amber-500 rounded-sm m-1.5 px-1 w-fit' key={index}>{msg.text}</div>
                        ))
                    ) : (
                        <p>No messages</p>
                    )
                }
            </div>
            <div className='flex w-full max-w-sm items-center space-x-2 '>
                <Input placeholder={"Enter Message"} value={message} onChange={(e) => { setMessage(e.target.value) }} />
                <Button name={"Send"} type={"submit"} onclick={sendMessagehandler} />
            </div>
        </div>
    )
}

export default ChatField