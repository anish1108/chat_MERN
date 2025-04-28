import express from "express";
import {createServer } from "http";
import { Server } from "socket.io";

import mongoose from "mongoose";
import User from "./db/userSchema.js";
import "dotenv/config";
import connectdb from "./db/connectionController.js";
import generateToken from "./utils/tokengenerator.js";
import validateUser from "./middlewares/validateUser.js";
import cookieParser from "cookie-parser";
import Message from "./db/messageSchema.js";
import cors from "cors";
import { json } from "stream/consumers";

const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer, {});
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"]
  }
});

const getreceiverSocket = (userId)=>{
  return userSockets[userId]
}

const userSockets = {}

io.on("connection", (socket)=>{
  console.log(`socket is connectedd ${socket.id}`)
  const userId = socket.handshake.query.userId;
  if(userId){
    userSockets[userId] = socket.id;
  }
  socket.on("message",(mess)=>{
    console.log("message is tis " + mess.clg)
    socket.emit("message", mess)
  }) 
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log("data inserted");
    res.json({
      message: "new user signed up" + user,
    });
  } catch (error) {
    console.log(`error is ${error}`);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(500).json({
        error: "no user found",
      });
    }
    if (user.password === password) {
      const token = generateToken(user._id, res);
      if (!token) {
        res.status(500).json({
          message: "token is null",
        });
      }
      // localStorage.setItem("token", token)
      res.send(user);
    }else{
      res.status(500).json({
        message: "wrong cred",
      });

    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "somethisng wrong"});
  }
});

app.get("/users", validateUser, async (req, res) => {
  try {
    const myid = req.user._id;
    const users = await User.find({ _id: { $ne: myid } }).select(-"password");
    if (!users) {
      res.status(500).json({ message: "no user found" });
    }
    res.send(users);
  } catch (error) {
    console.log(error);
    res.json({
      message: "somethis is wrong",
    });
  }
});

app.get("/messages/:userId", validateUser, async (req, res) => {

  const receiverId =req.params.userId;
  const senderId =  req.user._id;
  // console.log(`receiver is ${receiverId}`);
  // console.log(`sender is ${senderId}`)
  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    if (!messages) {
      res.status(500).json({message:"something is wrong"});
    }
    // console.log(`message is giving me ${JSON.stringify(messages)}`)
    messages.map((msg)=>{
      console.log(`msg is ${msg._id}`)
    })
    res.send(messages);
  } catch (error) {
    console.log("error is " + error)
    res.status(500).json({message:"somthing is wrong"});
  }
});

app.post("/sendMessage/:id", validateUser, async (req, res) =>{
  const message = req.body.message;
  const senderId = req.user._id;
  const receiverId = req.params.id;
  console.log(`senederi is ${senderId}`)
  console.log(`receir sii ${receiverId}`)
  console.log(`mesage si ${message}`)

  try {
    // Optional: Save the message to the database
    const newMessage = await Message.create({
        senderId,
        receiverId,
        text: message,
    });

    // res.json({
    //     message: "Message sent successfully",
    //     data: newMessage, // Return the saved message (optional)
    // });
} catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Something went wrong" });
}

  const receverSocketId = getreceiverSocket(receiverId)
  if(receverSocketId){
    io.to(getreceiverSocket).emit("new_message", message)
  }

  // res.status(201).json(message)

  res.send(message)
 
})

httpServer.listen(3000, () => {
  console.log("port is started at 3000");
  connectdb();
});
