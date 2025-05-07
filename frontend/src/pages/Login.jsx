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

    async function loginhandler(e){
        e.preventDefault();
        loginUser(email, password)
        
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='bg-gray-500 py-32 px-16 border-2 border-gray-400 rounded-lg space-y-4'>
                <h1 className='text-lg text-white'>Please Login here!!!!</h1>
            <form className='space-y-4 text-white' onSubmit={loginhandler}>
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button name="Submit" type="submit" />
            </form>
            </div>
            

        </div>
    )
}

export default Login