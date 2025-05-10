import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import Input from "../components/Input"
import Button from "../components/Button"
import { Userstore } from '../store/userStore'
import NoMessageTemp from './NoMessageTemp'
import { CgProfile } from "react-icons/cg";

function ChatField() {

    // const resp = ["anish", "kumar", "prasad"]
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
            // console.log(`received message ${JSON.stringify(data)}`)
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

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }

    }, [allmessages])



    return (
        <div className='bg-[#232631] rounded-2xl h-[73vh] w-[60vw]  m-4  p-4 relative shadow-xl/20 shadow-blue-400'>
            {
                receiver.name ?

                    <div className='grid content-between p-2 gap-4'>
                        <div className='px-2 flex items-center border-b border-[#3B3E46] hover:bg-[#3B3E46] rounded-2xl'>
                            <div className='text-4xl'>
                                <CgProfile />
                            </div>
                            <nav className='  p-2 px-4 hover:cursor-pointer'>
                                {` ${receiver.name}`}
                            </nav>
                        </div>

                        <div className='p-4 py-8 bg-radial-[at_25%_25%] from-[#3B3E46] to-[#232631] to-75% h-[50vh] rounded-2xl overflow-y-scroll [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500' >
                            {
                                allmessages.length > 0 ? (
                                    allmessages.map((msg, index) => (
                                        <div key={msg._id} className={`${msg.senderId == currentsender._id ? "flex justify-end" : "justify-start"}`}>
                                                <div className={`border p-1 px-4 border-[#3B3E46] bg-[#232631] rounded-lg m-1.5  text-gray-300  max-w-fit`} >
                                                    {msg.text}
                                                </div>
                                        </div>
                                        // ${msg.senderId === currentsender._id ? "bg-green-300" : "bg-red-600"} 
                                    ))
                                ) : (
                                    <p>No messages</p>
                                )
                            }

                            <div ref={messagesEndRef}></div>
                            <div className='flex  justify-center items-center space-x-2 absolute bottom-0 w-[55vw]'>
                                <div className='flex md:w-[60vw] gap-1 py-2'>
                                    <input type="text" placeholder='Enter Messajjge' value={message} onChange={(e) => { setMessage(e.target.value) }}
                                        className=' w-[85%] h-12 bg-[#3B3E46] px-4 rounded-2xl' />
                                    <button name='Send' type='submit' onClick={sendMessagehandler}
                                        className=' w-15 bg-blue-400 rounded-2xl hover:bg-blue-500'
                                    >Send</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    : <NoMessageTemp />
            }
        </div>

    )
}

export default ChatField