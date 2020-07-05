const User = require('../models/user');
const OTPService = require("../services/otp");


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
    // const regRes = await authy.registerUser({
    //         countryCode: req.body.countryCode,
    //         email: email,
    //         phone: mobile
    //     })
    const regRes = await OTPService.registerNewUser({
        countryCode: req.body.countryCode || '91',
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
    const { mobile, token } = req.body;
    // Validate emil & password
    if (!mobile || !token) return res.status(400).json({success: false,error: 'Please provide number and otp'})
    // Check for user
    const user = await  User.findOne({ mobile }).select({profileImage:0})
    if (!user) return res.status(401).json({ success: false, error: 'Invalid Credentials'})
    if(!user.isVerified) return res.status(401).json("Number Not Verified")
    const tokenRes = await OTPService.verifyOTP(user.authyId,token)
    // Check if password matches
    // const isMatch = await user.matchPassword(password);
    // if (!isMatch) {
    //     return next(res.status(401).json({success: false,error: 'Invalid Credentials'}));
    // }
    
    sendTokenResponse(user,200,res)
};


/**
 * @DESC Get token from model, 
 * create cookie and 
 * send response
 */
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const sendUser =  user.getPublicProfile()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({success: true,token,sendUser})
}

/**
 * @ROUTE : /api/v1/auth/sms
 * @DESC  : Send OTP sms
 */
exports.sms =async(req, res)=>{
    const {mobile} = req.body
    const user = await User.findOne({mobile})
    if(!user) return res.status(404).json("User not found")
    const smsRes = await OTPService.sendOTP(user.authyId)
    res.status(200).json(smsRes)

};

/**
 * @ROUTE : /api/v1/auth/verify
 * @DESC :  Verify otp
 */
exports.verify = async function (req, res , next) {
    const {mobile,token} = req.body;
    if(!mobile || !token ) res.status(400).json("No mobile or token found")
    const user = await User.findOne({mobile})
    if (!user) res.status(404).json("No User");
    const tokenRes= await OTPService.verifyOTP(user.authyId,token)   
    user.isVerified=true;
    await user.save()
    res.status(200).json({message:tokenRes});
}


/**
 * @ROUTE : api/v1/auth/me
 * @DESC  : Get Current User
 */
exports.getMe = async (req,res)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json(user)
}

/**
 * @ROUTE : api/v1/auth/users
 * @DESC  : Get all users
 */
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};


/**
 * @ROUTE : /api/v1/auth/:id/profileimage
 * @DESC  : Get profile Pic
 */
exports.getProfileImage = async (req,res)=>{
    const user = await User.findById(req.params.id).select({password:0});
    if(!user || !user.profileImage) return res.status(404).json()
    res.set('Content-Type', user.profileImage.contentType);
    res.send(user.profileImage.imageData);
}


