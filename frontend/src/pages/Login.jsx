import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function loginhandler(e){
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login",{
                email,
                password
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if(response){
                console.log(`response is ${response.data}`)
                alert(`You are logged in as ${email}`)
            }
        } catch (error) {
            console.log(error)
            alert("login failed")
        }
    }

    return (
        <div>
            <form onSubmit={loginhandler}>
                <Input placeholder="Email" value={email} onchange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" value={password} onchange={(e) => setPassword(e.target.value)} />
                <Button name="Submit" type="submit" />
            </form>

        </div>
    )
}

export default Login