const Maharaj = require("../models/Maharaj");
const OTPService = require("../services/otp");



exports.register = async(req,res)=>{
    const {name, email, mobile ,password, role ,address , city , zipcode  , kin ,yearsOfExp ,cuisine} =req.body
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
    sendTokenResponse(maharajDoc, 200, res)
    // res.status(200).json({success:true , sendMaharaj ,token})
    
}

/**
 * @ROUTE : /api/v1/authMaharaj/upload/profile
 * @DESC  : Upload profile image
 */
exports.uploadProfileImage = async (req,res)=>{
    const file = req.file;
    let profileImage={
        contentType:file.mimetype,
        imageData:file.buffer
    }
    req.user.profileImage = profileImage;
    await req.user.save();
    res.status(200).json("Profile image uploaded successfully.")
}
/**
 * @ROUTE : /api/v1/auth/upload/doc
 * @DESC  : Upload profile image
 */
exports.uploadDoc = async (req,res)=>{
    const file = req.file;
    let document={
        name:"aadhar",
        imageData: file.buffer , 
        contentType :file.mimetype
    }
    req.user.document = document;
    await req.user.save();
    res.status(200).json("Document  uploaded successfully.")
}





exports.login = async (req,res)=>{
    const { mobile, token } = req.body;
    // Validate emil & password
    if (!mobile || !token) return res.status(400).json({success: false,error: 'Please provide number and otp'});
    // Check for user
    const maharaj = await Maharaj.findOne({ mobile })
    if (!maharaj) return res.status(401).json({ success: false, error: 'Invalid Credentials'});
    if(!maharaj.isVerified) return res.status(401).json({success:false,msg:"Number Not Verified"});
    if(!maharaj.isApproved) return res.status(401).json({success:false,msg:"You are not aprroved yet..."})
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
    const JWTtoken = user.getSignedJwtToken();
    const tokenRes= await OTPService.verifyOTP(user.authyId,token)   
    user.isVerified=true;
    await user.save()
    res.status(200).json({message:tokenRes.message, token:JWTtoken});
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
 * @ROUTE : /api/v1/authMaharaj/maharajs
 * @DESC  : Get all maharajs
 */
exports.getMaharajs = async(req,res)=>{
    const maharaj = await Maharaj.find();
    res.status(200).json(maharaj)
}

/**
 * @ROUTE : /api/v1/authMaharaj/maharajs/:id
 * @DESC  : Get  mahharaj by id
 */
exports.getMaharajById= async (req,res)=>{
    const maharaj = await Maharaj.findById(req.params.id);
    if(!maharaj)return res.status(404).json("No maharaj found");
    const maharajSend = maharaj.getPublicProfile();
    res.status(200).json(maharajSend);
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
 * @ROUTE : /api/v1/maharajAuth/:id/doc
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

/**
 * @ROUTE : PUT /api/v1/maharajAuth/me
 * @DESC  : Update Maharaj Profile
 */
exports.updateProfile = async (req, res) => {
    const maharaj = await Maharaj.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    const maharajSend = maharaj.getPublicProfile();
    return res.status(200).json(maharajSend);
  };
  
