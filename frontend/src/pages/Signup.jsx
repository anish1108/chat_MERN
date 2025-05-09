import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function signupHandler(e) {
        e.preventDefault();
        if(!name || !email || !password){
            alert("fill all fields");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/signup",{
                name,
                email,
                password
            },{
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            if(response.status  === 200 || response.status === 201){
                // console.log(JSON.stringify(response))
                alert("Signed Up")
                navigate("/login")
            }
        } catch (error) {
            console.log("err is " + error)
            alert("Signup failed")
        }
        
    }

    return (
        <div className='h-[90vh] flex justify-center items-center '>
            
            <form onSubmit={signupHandler} className='bg-[#232631] py-32 px-16 rounded-2xl space-y-4 flex flex-col items-center'>
            <div className='text-2xl'>Register Your Account</div>
                    <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}
                    className='border-2 border-[#3B3E46] p-2 rounded-2xl' />
                    <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
                    className='border-2 border-[#3B3E46] p-2 rounded-2xl' />
                    <input placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
                    className='border-2 border-[#3B3E46] p-2 rounded-2xl' />
                    <button className='bg-blue-400 rounded-2xl w-18 h-10' type='submit' name='Submit'>Submit</button>
            </form>

        </div>


    )
}

export default Signup