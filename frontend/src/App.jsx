import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Signup from "./pages/Signup"
import ChatContainer from "./pages/chatContainer"
import { useEffect, useState } from "react"
import {io} from "socket.io-client"
import Test from "./components/Test"
import { Userstore } from "./store/userStore"


function App() {
  const navigate = useNavigate()

  const {validateUser, isloggedIn, currentsender} = Userstore()

  useEffect(()=>{
    validateUser();
  },[  validateUser])

  useEffect(()=>{
    console.log(`islogged is ${isloggedIn}`)
  },[isloggedIn])

  useEffect(() => {
          console.log(`current sender is ${JSON.stringify(currentsender)}`)
          // console.log(`socket is ${JSON.stringify(socket)}`)
          if(currentsender){
              navigate("/home")
          }else{
            navigate("/login")
          }
        }, [currentsender])

  return (
    <div className="bg-[#3B3E46] h-screen p-0 m-0 overflow-auto text-white flex flex-col justify-center">
      <div className="" > 
        <Navbar/>
      </div>
      <div className="  h-[90vh]">
      <Routes>
          <Route path="/" element={isloggedIn?<ChatContainer/>: <Navigate to={"/login"}/> }/>
          <Route path="home" element={<ChatContainer/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
      </Routes>
      </div>
      
    </div>
  )
}

export default App
