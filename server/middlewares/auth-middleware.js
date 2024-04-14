const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async(req,res,next) => {

    const token = req.header('Authorization');

    if(!token) {
        // if you attempt to use an expired token,you'll receive a 401 Unauthorized HTTP response
        return res.status(401)
        .json({message : "unauthorized HTTP , Token not provided"});
    }

    // assuming token is in the foramt "Bearer <JwtToken> , removing the "Bearer" prefix"
    const JwtToken = token.replace("Bearer","").trim();
    console.log("token form auth middleware" ,JwtToken);

    try {
        const isVerified = jwt.verify(JwtToken,process.env.JWT_SECRET_KEY);

        const userData = await User.findOne({email:isVerified.email}).
        select({
            password:0,
        });
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();     
    } catch (error) {
        return res.status(401)
        .json({message : "unauthorized. Invalid token"});
    }
   
};
module.exports = authMiddleware;