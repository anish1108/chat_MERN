import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import ChatContainer from "./pages/chatContainer"
import { useEffect } from "react"
import {io} from "socket.io-client"
import Test from "./components/Test"


function App() {
  // useEffect(() => {
  //   console.log("ok is running")
  //   const socket = io("http://localhost:3000",{
  //     withCredentials: true
  //   })
  // }, [])
  

  return (
    <>
      <div> 
        <Navbar/>
      </div>
      <Routes>
          <Route path="/" element={<Test/>}/>
          <Route path="home" element={<ChatContainer/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
      </Routes>
      
      
    </>
  )
}

export default App
