import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ContactHolder() {
    // const resp = ["anish", "kumar", "prasad"]
    const [users, setUsers] = useState([])

    async function contactLoader(){
        try {
            
            const response = await axios.get("http://localhost:3000/users",{
                withCredentials: true
            })
            if(!response){
                console.log("not found")
                return
            }
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }   
    }

    useEffect(() => {
      contactLoader()
    }, [])
    
  return (
    <div>
        {
            users.map((ele)=>{
                return (<div key={ele._id}>{ele.name}</div>)
            })
        }
    </div>
  )
}

export default ContactHolder