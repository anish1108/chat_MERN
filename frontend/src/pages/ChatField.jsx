import axios from 'axios'
import React, { useState, useEffect } from 'react'

function ChatField() {

    const resp = ["anish", "kumar", "prasad"]
    const [messages, setMessages] = useState([])

    async function messageHandler(){
        const userId = "67fa8d8bca6887da94646225"
        try {
            const response = await axios.get(`http://localhost:3000/messages/${userId}`,{
                withCredentials: true
            })
            console.log(`response is ${JSON.stringify(response.data)}`)
        } catch (error) {
            console.log("error is hrergghgh " + error)
        }
    }

    useEffect(() => {
      messageHandler();
    }, [])
    

  return (
    <div>
        {
            resp.map((ele)=>{
                return ( <div key={Math.random()}>{ele}</div> )
            })
        }
    </div>
  )
}

export default ChatField