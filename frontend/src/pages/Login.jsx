import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { io } from "socket.io-client"
import { Userstore } from '../store/userStore';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser, currentsender, socket } = Userstore()
    const navigate = useNavigate()

    async function loginhandler(e) {
        e.preventDefault();
        loginUser(email, password)

    }

    return (
        <div className='h-[90vh] flex justify-center items-center'>
            <div className='bg-[#232631] py-32 px-16 rounded-2xl space-y-4 flex flex-col items-center'>
                <h1 className='text-2xl'>Please Login here!!!!</h1>
                <form className='flex flex-col justify-center items-center  space-y-4 text-white' onSubmit={loginhandler}>
                    <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className='border-2 border-[#3B3E46] p-2 rounded-2xl' />
                    <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className='border-2 border-[#3B3E46] p-2 rounded-2xl' />
                    <button name='"Submit' type='submit'
                        className='bg-blue-400 rounded-2xl w-18 h-10'>Submit</button>
                </form>
                <div>New user !!! <Link to="/signup" className='underline underline-offset-4 text-blue-400' >Sign Up</Link> </div>
            </div>


        </div>
    )
}

export default Login