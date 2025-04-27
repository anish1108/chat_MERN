import { create } from "zustand";
import { io } from "socket.io-client";
import axios from "axios";

export const Userstore = create((set, get) => ({
  currentsender: null,
  receiver: {},
  socket: null,
  allmessages: null,

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
    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });
    socket.connect();
    set({ socket: socket });
  },

  restoreMessages: async () => {
    const userId = receiver._id;
    console.log(`userid si ${userId}`);
    try {
      const response = await axios.get(
        `http://localhost:3000/messages/${userId}`,
        {
          withCredentials: true,
        }
      );
      set({allmessages: response.data})
      console.log(`response is ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.log("error is hrergghgh " + error);
    }
  },
}));
