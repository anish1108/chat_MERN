import { create } from "zustand";
import { io } from "socket.io-client";
import axios from "axios";

export const Userstore = create((set, get) => ({
  currentsender: null,
  receiver: {},
  socket: null,
  allmessages: [],

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
    // get().restoreMessages();
  },

  connectToSocket: () => {
    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });
    socket.connect();
    set({ socket: socket });
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
      console.log(`restor eka respone si ${response}`)
      set({ allmessages: [...allmessages, response.data]});
      console.log(`response isss ${JSON.stringify(response.data)}`);
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
      console.log(`response is ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.log("error is hrergghgh " + error);
    }
  },
}));
