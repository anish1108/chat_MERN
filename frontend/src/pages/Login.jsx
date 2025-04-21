import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client"
import { Userstore } from '../store/userStore';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser, currentsender, socket} = Userstore()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(`current sender is ${JSON.stringify(currentsender)}`)
        // console.log(`socket is ${JSON.stringify(socket)}`)
        if(currentsender){
            navigate("/home")
        }
      }, [currentsender])

    async function loginhandler(e){
        e.preventDefault();
        loginUser(email, password)
        
    }

    return (
        <div>
            <form onSubmit={loginhandler}>
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button name="Submit" type="submit" />
            </form>

        </div>
    )
}

export default Login