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

app.use(express.json());
app.use(cookieParser());

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
    console.log(email);
    console.log(password);
    console.log(`user is ${user}`);
    if (!user) {
      res.send("no user" + user);
    }
    if (user.password === password) {
      generateToken(user._id, res);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", validateUser, async (req, res) => {
  try {
    const myid = req.user._id;
    const users = await User.find({ _id: { $ne: myid } }).select(-"password");
    if (!users) {
      res.send("no user found");
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
  const senderId = req.user.email;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    if (!messages) {
      res.send("something is wrong");
    }
    res.send(messages);
  } catch (error) {
    res.send(error);
  }
});

app.listen(3000, () => {
  console.log("port is started at 3000");
  connectdb();
});
