import React from 'react'
import ContactHolder from './ContactHolder'
import ChatField from './ChatField'
import { useState } from 'react';
import { Userstore } from '../store/userStore';

function ChatContainer() {

    const {isSidebarVisible} = Userstore()
    console.log(`issidevar is ${isSidebarVisible}`)

    return (
        <div className="flex flex-row md:flex-row px-8">

            <div
                className={`${
                    isSidebarVisible ? "block" : "hidden"
                } md:block w-full md:w-1/4  border-b-2 md:border-b-0 border-black basis-1/3 `}
            >
                <ContactHolder />
            </div>

            <div className={`${isSidebarVisible ? "hidden" : "block"} basis-2/3 md:block` }>
                <ChatField />
            </div>
        </div>

        
    )
}

export default ChatContainer