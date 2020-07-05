const User = require("../models/user");
const Maharaj = require("../models/maharaj")
const jwt = require("jsonwebtoken");

/**
 * Requires a token in request headers.
 * Header format is
 * Authorization: Bearer token
 */
const authRequired =(role)=>async (req, res, next) => {
    const header = req.header('Authorization');
    if (!header) {
        return res.status(401).json({
            msg: 'Please Provide JWT',
        });
    }
    const token = header.replace('Bearer', '').trim();
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        if (!decoded) {
            return res.status(401).json({
                msg: 'Invalid token',
            });
        }
        const user = role=='user'?await User.findOne({ _id: decoded.id }).select({password:0}):await Maharaj.findOne({ _id: decoded.id }).select({password:0})
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