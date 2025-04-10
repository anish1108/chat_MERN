import mongoose from "mongoose";

async function connectdb(){
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
    // console.log(process.env)
}

export default connectdb;