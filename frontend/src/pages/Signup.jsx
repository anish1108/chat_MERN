import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from "axios"

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                console.log(JSON.stringify(user))
                alert("Signed Up")
            }
        } catch (error) {
            console.log("err is " + error)
            alert("Signup failed")
        }
        
    }

    return (
        <div>
            <form onSubmit={signupHandler}>
                <div >
                    <Input placeholder="Name" value={name} onchange={(e)=>setName(e.target.value)} />
                    <Input placeholder="Email" value={email} onchange={(e)=>setEmail(e.target.value)} />
                    <Input placeholder="Password" value={password} onchange={(e)=>setPassword(e.target.value)}/>
                </div>
                <Button type="submit" name="Submit" />
            </form>

        </div>


    )
}

export default Signup