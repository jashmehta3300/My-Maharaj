const User = require('../models/user');
const Client = require("authy-client").Client;
const authy = new Client({ key: "dbptWFfK9z9ZSaXfXZHdeQZcyNzWRm0Z" });
// @desc      Register User
// @route     POST /api/v1/auth/register
// @access    public
exports.register = async(req, res, next) => {
    const { name, email, mobile ,password, role , city  } = req.body;
    const file = req.file;
    //Create user
    let user = new User({
        name: name,
        email: email,
        mobile:mobile,
        password: password,
        role: role,
        profileImage:{
            contentType:file.mimetype,
            imageData:file.buffer
        }
    });
    await user.save();
    const regRes = await authy.registerUser({
            countryCode: req.body.countryCode,
            email: email,
            phone: mobile
        })
        user.authyId=regRes.user.id
        await user.save()
        sendTokenResponse(user, 200, res)
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async(req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body)
    // Validate emil & password
    if (!email || !password) {
        return next(
            res.status(400).json({success: false,error: 'Please provide email and password'}));
        }
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(
            res.status(401).json({
                success: false,
                error: 'Invalid Credentials'
            })
        );
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(res.status(401).json({success: false,error: 'Invalid Credentials'}));
    }
    sendTokenResponse(user,200,res)
};

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({success: true,token,user})
}

exports.sms =async(req, res)=>{
    const {id} = req.body
    console.log(id)
    const user = await User.findById(req.body.id)
    if(!user) return res.status(404).json("USer not found")
    const smsRes = await authy.requestSms({authyId: user.authyId}, {force: true})
    res.status(200).json(smsRes)

};


exports.verify = async function (req, res , next) {
    const user = await User.findById(req.body.id)
    if (!user) {
        res.status(404).json("No User");
    }
    const tokenRes= await authy.verifyToken({authyId: user.authyId, token: req.body.token})   
    console.log("success")
    user.isVerfied=true;
    await user.save()
    res.status(200).json({message:tokenRes.message});
}

    





