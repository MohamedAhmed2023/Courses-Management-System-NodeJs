const jwt = require('jsonwebtoken');
const HttpStatusText = require('../utils/HttpStatusText');
const Auth = (req, res, next) => {
    const AuthHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!AuthHeader) {
        return res.status(401).json({ status: HttpStatusText.ERROR, message: "token is required" })
    }
    const token = AuthHeader.split(' ')[1];
    try {
        const currentuser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentuser = currentuser;
        next();
    } catch (err) {
        return res.status(401).json({ status: HttpStatusText.ERROR, message: "invaled token" })
    }
}

module.exports = Auth;