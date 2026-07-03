const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "token not found" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`the decode text is ${JSON.stringify(decoded)} in middleware`)
        req.user = decoded; // --> here we are creating our new property user and storing the decoded user there

        console.log(`the set req.user is in middlware ${JSON.stringify(req.user)}`);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = auth;