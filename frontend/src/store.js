import { create } from "zustand"
import { io } from "socket.io-client"

const counter = create((set)=>({
    count: 1,
    inc: ()=> set((state)=> ({
        count: state.count+1
    }))
}))

const socketConnection = create((set)=>({
    socket: null,
    inc: ()=> set(()=>({
        socket: io("http://localhost:3000",{
                        withCredentials: true
                })
    }))
}))

const useCurrentsender = create((set)=>({
    currntSender: null,
    setCurrentsender: ()=>({
        currntSender: null
    })
}))

export default socketConnection