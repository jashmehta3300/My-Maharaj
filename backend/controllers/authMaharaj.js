const Maharaj = require("../models/maharaj");
const OTPService = require("../services/otp");
const maharaj = require("../models/maharaj");


exports.register = async(req,res)=>{
    const {name, email, mobile ,password, role ,address , city , zipcode , documentName , kin ,yearsOfExp ,cuisine} =req.body
    const profileImage = req.files['image'][0]
    const document = req.files['doc'][0]
    if(!document || !profileImage){
        return res.status(400).json("Plase upload image and doc")
    }
    let maharajDoc = new Maharaj({
        name:name,
        email:email,
        mobile:mobile,
        password:password,
        role:role,
        registeredAddress:{
            address: address,
            city: city,
            zipcode: zipcode
        },
        profileImage:{
            contentType:profileImage.mimetype,
            imageData:profileImage.buffer
        },
        document:{
            name:documentName,
            imageData: document.buffer , 
            contentType :document.mimetype
        },
        kin:kin,
        cooking:{
            cuisine:cuisine,
            yearsOfExp : yearsOfExp
        }
    })
    
    const regRes = await OTPService.registerNewUser({
        countryCode: req.body.countryCode || '91',
        email: email,
        phone: mobile
    })
    maharajDoc.authyId = regRes.user.id
    await maharajDoc.save()
    sendTokenResponse(maharaj, 200, res)
    //res.status(200).json({success:true , sendMaharaj ,token})
    
}

exports.login = async (req,res)=>{
    const { mobile, token } = req.body;
    // Validate emil & password
    if (!mobile || !token) return res.status(400).json({success: false,error: 'Please provide number and otp'})
    // Check for user
    const maharaj = await Maharaj.findOne({ mobile })
    if (!maharaj) return res.status(401).json({ success: false, error: 'Invalid Credentials'})
    if(!maharaj.isVerified) return res.status(401).json("Number Not Verified")
    const tokenRes = await OTPService.verifyOTP(maharaj.authyId,token)
    // Check if password matches
    // const isMatch = await user.matchPassword(password);
    // if (!isMatch) {
    //     return next(res.status(401).json({success: false,error: 'Invalid Credentials'}));
    // }
    sendTokenResponse(maharaj,200,res)
}



/**
 * @DESC Get token from model, 
 * create cookie and 
 * send response
 */
const sendTokenResponse = (maharaj, statusCode, res) => {
    const token = maharaj.getSignedJwtToken();
    const sendMaharaj =  maharaj.getPublicProfile()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({success: true,token,sendMaharaj})
}



/**
 * @ROUTE : /api/v1/authMaharaj/sms
 * @DESC :  Verify otp
 */
exports.sms =async(req, res)=>{
    const {mobile} = req.body
    const user = await Maharaj.findOne({mobile})
    if(!user) return res.status(404).json("User not found")
    const smsRes = await OTPService.sendOTP(user.authyId)
    res.status(200).json(smsRes)

};

/**
 * @ROUTE : /api/v1/authMaharaj/verify
 * @DESC :  Verify otp
 */
exports.verify = async function (req, res , next) {
    const {mobile,token} = req.body;
    if(!mobile || !token ) res.status(400).json("No mobile or token found")
    const user = await Maharaj.findOne({mobile})
    if (!user) res.status(404).json("No User");
    const tokenRes= await OTPService.verifyOTP(user.authyId,token)   
    user.isVerified=true;
    await user.save()
    res.status(200).json({message:tokenRes.message});
}

/**
 * @ROUTE : /api/v1/authMaharaj/me
 * @DESC  : Get current mahharaj
 */
exports.getMe =async (req,res)=>{
    const maharaj = await Maharaj.findById(req.user.id);
    res.status(200).json(maharaj.getPublicProfile())
}


/**
 * @ROUTE : /api/v1/authMaharaj/me
 * @DESC  : Get current mahharaj
 */
exports.getMaharajs = async(req,res)=>{
    const maharaj = await Maharaj.find();
    res.status(200).json(maharaj)
}


/**
 * @ROUTE : /api/v1/maharajAuth/:id/profileimage
 * @DESC  : Get profile Pic
 */
exports.getProfileImage = async (req,res)=>{
    const maharaj = await Maharaj.findById(req.params.id).select({password:0,document:0});
    if(!maharaj || !maharaj.profileImage){
        return res.status(404).json()
    }
    res.set('Content-Type', maharaj.profileImage.contentType);
    res.send(maharaj.profileImage.imageData);
}
/**
 * @ROUTE : /api/v1/:id/doc
 * @DESC  : Get document Pic
 */
exports.getDocument = async (req,res)=>{
    const maharaj = await Maharaj.findById(req.params.id).select({password:0,profileImage:0});
    if(!maharaj || !maharaj.document){
        return res.status(404).json()
    }
    res.set('Content-Type', maharaj.document.contentType);
    res.send(maharaj.document.imageData);
}