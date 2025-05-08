import React from 'react'
import ContactHolder from './ContactHolder'
import ChatField from './ChatField'
import { useState } from 'react';

function ChatContainer() {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    return (
        <div className="flex flex-row md:flex-row">
            <button
                className="md:hidden bg-green-500 text-white p-2"
                onClick={toggleSidebar}
            >
                {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
            </button>

            <div
                className={`${
                    isSidebarVisible ? "block" : "hidden"
                } md:block w-full md:w-1/4  border-b-2 md:border-b-0 md:border-r-2 border-black basis-1/3 `}
            >
                <ContactHolder />
            </div>

            <div className=" basis-2/3">
                <ChatField />
            </div>
        </div>

        
    )
}

export default ChatContainer