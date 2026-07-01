const jwt = require("jsonwebtoken");

function auth(req,res,next) {
    
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.satatus(401).json({message : "token not found"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        res.satatus(401).json({message : "Invalid token"});
    }
}

module.exports = auth;