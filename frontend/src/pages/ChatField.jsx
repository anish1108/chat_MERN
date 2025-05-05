import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import Input from "../components/Input"
import Button from "../components/Button"
import { Userstore } from '../store/userStore'

function ChatField() {

    const resp = ["anish", "kumar", "prasad"]
    const [message, setMessage] = useState("")
    const { receiver, allmessages, sendMessage, currentReceiver, currentsender, socket } = Userstore();
    const messagesEndRef = useRef(null)

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

    useEffect(()=>{
        if(messagesEndRef.current){
            messagesEndRef.current.scrollIntoView({behavior:"smooth"})
        }

    },[allmessages])


    return (
        <div className='grid content-between h-screen p-2'>
            <nav>

                {` ${receiver.name}`}


            </nav>
            <div className='min-h-10/12 overflow-auto scroll-auto' >
                {
                    allmessages.length > 0 ? (
                        allmessages.map((msg, index) => (
                            <div className={`${msg.senderId == currentsender._id ? "flex justify-end" : "justify-start"} `}>
                                <div className={`${msg.senderId === currentsender._id ? "bg-green-600" : "bg-red-600"}  border-2 border-amber-500 rounded-sm m-1.5 px-1 w-fit`} key={index}>{msg.text}</div>
                            </div>
                        ))
                    ) : (
                        <p>No messages</p>
                    )
                }
                <div ref={messagesEndRef}></div>
            </div>
            <div className='flex  justify-center  space-x-2'>
                <div className='flex w-2xl'>
                    <Input placeholder={"Enter Message"} value={message} onChange={(e) => { setMessage(e.target.value) }} />
                    <Button name={"Send"} type={"submit"} onclick={sendMessagehandler} />
                </div>
            </div>
        </div>
    )
}

export default ChatField