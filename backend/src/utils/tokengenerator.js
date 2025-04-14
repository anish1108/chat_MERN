import jwt from "jsonwebtoken";

function generateToken(userId, res){
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET);
        if(!token){
            res.status(500).json({
                message: "token not generated"
            })
        }
        res.cookie("token", token, {httpOnly:true, secure: process.env.NODE_ENV === "production"})

        return token;
    } catch (error) {
        console.log("error in generating token")
        res.status(500).json({
            error: "failed to generate token"
        })
    }
    
}

export default generateToken;