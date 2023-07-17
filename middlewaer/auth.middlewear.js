
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req,res,next) =>{

    const token = req.headers.authorization?.split(" ")[1] || null;
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.body.userID = decoded.userID;
        next()
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

module.exports = {auth}