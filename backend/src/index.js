import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import mongoose from "mongoose";
import User from "./db/userSchema.js";
import dotenv from "dotenv"
import connectdb from "./db/connectionController.js";
import generateToken from "./utils/tokengenerator.js";
import validateUser from "./middlewares/validateUser.js";
import cookieParser from "cookie-parser";
import Message from "./db/messageSchema.js";
import cors from "cors";
import { json } from "stream/consumers";
import path from "path";

const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer, {});
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

dotenv.config();
const PORT = process.env.PORT;
// const __dirname = path.resolve();


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const getreceiverSocket = (userId) => {
  return userSockets[userId];
};

const userSockets = {};

io.on("connection", (socket) => {
  console.log(`socket is connectedd ${socket.id}`);
  // console.log(socket.handshake)
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSockets[userId] = socket.id;
    console.log(`user ${userId} is connecred with socket id ${socket.id}`);
    console.log(userSockets);
  } else {
    console.log("not found");
    return;
  }

  socket.on("newMessage", (data) => {
    const receverSocketId = getreceiverSocket(data.data.receiverId);
    console.log(`receverSocketId is ${receverSocketId}`);
    if (receverSocketId) {
      io.to(receverSocketId).emit("receiveMsg", data);
    }
  });

  // socket.on(("disconnect", ()=>{
  //   console.log(`scoket is disconeted ${socket.id}`)
  //   for(const [key, value] of Object.entries(userSockets)){
  //     if(value === socket.id){
  //       delete userSockets[key];
  //       break;
  //     }
  //   }
  // }))
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    if(user){
      console.log("data inserted");
      const userWithoutPassword = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
    res.json({
      message: "new user signed up" + userWithoutPassword,
    });
    }
    
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
      const userWithoutPassword = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      res.send(userWithoutPassword);
    } else {
      res.status(500).json({
        message: "wrong cred",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somethisng wrong" });
  }
});

app.get("/users", validateUser, async (req, res) => {
  try {
    const myid = req.user._id;
    const users = await User.find({ _id: { $ne: myid } }).select("-password");
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
  const receiverId = req.params.userId;
  const senderId = req.user._id;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    if (!messages) {
      res.status(500).json({ message: "something is wrong" });
    }

    res.send(messages);
  } catch (error) {
    console.log("error is " + error);
    res.status(500).json({ message: "somthing is wrong" });
  }
});

app.post("/sendMessage/:id", validateUser, async (req, res) => {
  const message = req.body.message;
  const senderId = req.user._id;
  const receiverId = req.params.id;
  console.log(`senederi is ${senderId}`);
  console.log(`receir sii ${receiverId}`);
  console.log(`mesage si ${message}`);

  try {
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: message,
    });

    res.status(201).send(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/validateUser",validateUser, (req, res)=>{
  try {
    res.send(req.user)
  } catch (error) {
    console.log("please login")
  }
})

app.get("/logout", (req, res)=>{
  try {
    res.cookie("token","",{maxAge:0})
    res.status(201).json({
      message: "successfully logout"
    })
  } catch (error) {
    console.log(`error in logging out ${error}`)
    res.status(502).json({message:"error hai"})
  }
})

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("/*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

httpServer.listen(PORT, () => {
  console.log("port is started at " + PORT);
  connectdb();
});
