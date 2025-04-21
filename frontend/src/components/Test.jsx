import React from 'react'
import useStore from '../store'
import counter from '../store'
import socketConnection from "../store"


function Test() {

    const {socket, inc} = socketConnection()
    let msg = "hfiajef"
  return (
    <div>
        <div>{socket}</div>
         
         <button onClick={inc}>click</button>
        
        

    </div>
   
  )
}

export default Test