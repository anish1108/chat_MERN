import jwt from "jsonwebtoken";
import User from "../db/userSchema.js";
import mongoose from "mongoose";

let validateUser = async(req, res, next)=>{
    try {
        // console.log(req.cookies)
        const token = req.cookies.token;
        
        if(!token){
            return res.status(500).json({message: "not valid hehege"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(500).json({message: "not valid2"})
        }
        // console.log(`decode is ${JSON.stringify(decoded)}`)
        
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(500).json({message: "not valid3"});
        }

        req.user = user;
        // console.log(`req.user is ${req.user}`)
        next();

    } catch (error) {
        res.status(500).json({message: `error is hehe ${error}`})
    }
}

export default validateUser;