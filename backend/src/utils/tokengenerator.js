import jwt from "jsonwebtoken";

function generateToken(userId, res){
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    res.cookie("token", token, {httpOnly:true, secure: true})
    res.send(token)
}

export default generateToken;