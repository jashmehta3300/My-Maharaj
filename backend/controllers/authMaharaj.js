const Maharaj = require("../models/maharaj");
const OTPService = require("../services/otp");


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
    maharajDoc.authyID = regRes.user.id
    await maharajDoc.save()
    const token = await maharajDoc.getSignedJwtToken()
    const sendMaharaj =  maharajDoc.getPublicProfile()
    //sendTokenResponse(maharaj, 200, res)
    res.status(200).json({success:true , sendMaharaj ,token})
    
}

exports.login = async (req,res)=>{

}

/**
 * @DESC Get token from model, 
 * create cookie and 
 * send response
 */

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({success: true,token,user})
}