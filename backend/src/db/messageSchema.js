import mongoose from "mongoose";
import User from "./userSchema";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId() ,
        ref: User,
        required: true
    },
    receiverId: {
        type: mongoose.Types.ObjectId(),
        ref: User,
        required: true
    },
    text:{
        type: String
    }
},  {timestamps: true})

const Message = mongoose.model("message", messageSchema);
export default Message;