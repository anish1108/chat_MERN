import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setcurrentuser] = useState([])
    const navigate = useNavigate()

    async function loginhandler(e){
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login",{
                email,
                password
            },{
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            
            if(response){
                console.log(`response is ${JSON.stringify( response.data)}`)
                setcurrentuser(JSON.stringify( response.data))
                alert(`You are logged in as ${ response.data.name}`)
                navigate("/home")
            }

        } catch (error) {
            console.log(error)
            alert("login failed")
        }
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