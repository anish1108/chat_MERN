import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Signup from "./pages/Signup"
import ChatContainer from "./pages/ChatContainer"
import { useEffect, useState } from "react"
import {io} from "socket.io-client"
import Test from "./components/Test"
import { Userstore } from "./store/userStore"


function App() {
  const navigate = useNavigate()

  const {validateUser, isloggedIn, currentsender, logoutHandler} = Userstore()

  useEffect(()=>{
    validateUser();
  },[  validateUser])

  useEffect(()=>{
    console.log(`islogged is ${isloggedIn}`)
  },[isloggedIn])

  useEffect(() => {
          // console.log(`current sender is ${JSON.stringify(currentsender)}`)
          // console.log(`socket is ${JSON.stringify(socket)}`)
          if(isloggedIn){
              navigate("/home")
          }else{
            navigate("/login")
          }
        }, [currentsender, logoutHandler])

  return (
    <div className="h-screen flex flex-col justify-center items-center w-screen bg-[#272b38c2]">

   
    <div className="bg-[#3B3E46] w-[90vw] h-[90vh] p-0 m-0 overflow-auto text-white flex flex-col justify-center items-center rounded-2xl">
      <div className="" > 
        <Navbar/>
      </div>
      <div className="  h-[75vh]">
      <Routes>
          <Route path="/" element={isloggedIn?<ChatContainer/>: <Navigate to={"/login"}/> }/>
          <Route path="/home" element={<ChatContainer/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
      </Routes>
      </div>
    </div>
    </div>
  )
}

export default App
