import express from "express";
const app = express();
import mongoose from "mongoose";
import User from "./db/userSchema.js";
import "dotenv/config";
import connectdb from "./db/connectionController.js";
import generateToken from "./utils/tokengenerator.js";
import validateUser from "./middlewares/validateUser.js";
import cookieParser from "cookie-parser";
import Message from "./db/messageSchema.js";
import cors from "cors";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
// app.use(cors());

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

  const receiverId =new mongoose.Types.ObjectId( req.params.userId);
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
    res.send(messages);
  } catch (error) {
    console.log("error is " + error)
    res.status(500).json({message:"somthing is wrong"});
  }
});

app.listen(3000, () => {
  console.log("port is started at 3000");
  connectdb();
});
