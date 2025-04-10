import jwt from "jsonwebtoken";
import User from "../db/userSchema.js";

let validateUser = async(req, res, next)=>{
    try {
        // console.log(req.cookies)
        const token = req.cookies.token;
        
        if(!token){
            res.send("not valid");
        }
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            res.send("not valid2")
        }
        // console.log(`decode is ${JSON.stringify(decoded)}`)
        
        const user = await User.findById(decoded.userId);
        if(!user){
            res.send("not valid3");
        }

        req.user = user;
        next();



    } catch (error) {
        res.send(`error is ${error}`)
    }
}

export default validateUser;