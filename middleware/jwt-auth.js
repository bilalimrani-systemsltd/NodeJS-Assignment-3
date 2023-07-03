const jwt = require("jsonwebtoken");
const config = require('../config/jwt-config.json');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, config.secret);
        req.userAuth = decode;
        next();
    } catch (error) {
        res.status(401).json({
                code: 401,
                message: "Unauthorized"
            }
        );
    }
};