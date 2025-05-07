import { create } from "zustand";
import { io } from "socket.io-client";
import axios from "axios";

export const Userstore = create((set, get) => ({
  currentsender: null,
  receiver: {},
  socket: null,
  allmessages: [],
  isloggedIn: undefined,

  loginUser: async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response) {
        set({isloggedIn: true})
        set({ currentsender: response.data });
        console.log(`response is ${JSON.stringify(response.data)}`);
        alert(`You are logged in as ${response.data.name}`);
        get().connectToSocket();
      }
    } catch (error) {
      console.log(error);
      alert("login failed");
    }
  },

  currentReceiver: (user) => {
    set({ receiver: user });
    get().restoreMessages();
  },

  connectToSocket: () => {
    const {currentsender} = get();
    console.log(`snedde f ${currentsender._id}`)
    const socket = io("http://localhost:3000", {
      withCredentials: true,
      query: {
        userId: currentsender._id
      }
      
      
    });
    socket.connect();
    set({ socket: socket });

    socket.on("newMessage", (message)=>{
      set((state) => ({
        allmessages: [...state.allmessages, message]
      }))

    })
  },

  restoreMessages: async () => {
    // const userId = receiver._id;
    const {receiver, allmessages} = get();
    console.log(`userid si ${receiver._id}`);
    try {
      const response = await axios.get(
        `http://localhost:3000/messages/${receiver._id}`,
        {
          withCredentials: true,
        }
      );
      set({ allmessages: []});
      let temp = response.data.map((msg) => msg)
    
      set({allmessages: temp})
      console.log(`allmessagefesjf isss ${allmessages}`);
    } catch (error) {
      console.log("error is hrergghgh " + error);
    }
  },

  sendMessage: async (message) => {
    const { receiver} = get();
    console.log(`receiver si ${JSON.stringify(receiver)}`);
    console.log(`receiver si ${JSON.stringify(receiver._id)}`);
    try {
      const response = await axios.post(
        `http://localhost:3000/sendMessage/${receiver._id}`, {message},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response;

      
      console.log(`response.text ${response}`)
      
      console.log(`response is ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.log("error is hrergghgh " + error);
    }
  },

  validateUser: async()=>{
    try {
      const response = await axios.get("http://localhost:3000/validateUser", {
        withCredentials: true
      })
      if(!response){
        console.log("not found")
        return 
      }
      console.log(`resss is thijf ${JSON.stringify(response)}`)
      set({isloggedIn: true})
      set({ currentsender: response.data})
      get().connectToSocket();
    } catch (error) {
      set({isloggedIn: false})
      console.log("something is error"+ error)
    }
  },

  logoutHandler: async()=>{
    try {
      const response = await axios.get("http://localhost:3000/logout",{
        withCredentials: true
      })
      set({isloggedIn: false})
      set({currentsender: null})
      // console.log(`isssslogingin ${isloggedIn}`)
      console.log(`logout response ${response}`)
      
    } catch (error) {
      console.log(`error is a f ${error}`)
    }
  }
}));
