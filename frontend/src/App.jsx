import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import ChatContainer from "./pages/chatContainer"


function App() {

  return (
    <>
      <div> 
        <Navbar/>
      </div>
      <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="home" element={<ChatContainer/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
      </Routes>
      
      
    </>
  )
}

export default App
