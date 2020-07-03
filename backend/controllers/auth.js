const User = require('../models/user');

// @desc      Register User
// @route     POST /api/v1/auth/register
// @access    public
exports.register = async(req, res, next) => {
    const { name, email, password, role } = req.body;

    //Create user
    const user = await User.create({
        name: name,
        email: email,
        password: password,
        role: role
    });

    sendTokenResponse(user, 200, res)

    // //Create token
    // const token = user.getSignedJwtToken();

    // //So now we are encrypting the password and instead of returning the data, we are sending a JWT token back

    // res.status(200).json({
    //     success: true,
    //     token: token
    // });
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async(req, res, next) => {
    const { email, password } = req.body;

    // Validate emil & password
    if (!email || !password) {
        return next(
            res.status(400).json({
                success: false,
                error: 'Please provide email and password'
            })
        );
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
        return next(
            res.status(401).json({
                success: false,
                error: 'Invalid Credentials'
            })
        );
    }

    sendTokenResponse(user,200,res)
    // const token = user.getSignedJwtToken();

    // res.send(200).json({
    //     success: true,
    //     token
    // });
};

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}