const User = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * Requires a token in request headers.
 * Header format is
 * Authorization: Bearer token
 */
const authRequired = async (req, res, next) => {
    const header = req.header('Authorization');
    if (!header) {
        return res.status(401).json({
            msg: 'Please Provide JWT',
        });
    }
    const token = header.replace('Bearer', '').trim();
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                msg: 'Invalid token',
            });
        }
        const user = await User.findOne({ _id: decoded._id });
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        return res.status(401).json({
            msg: 'Invalid token',
        });
    }
};

module.exports={authRequired}