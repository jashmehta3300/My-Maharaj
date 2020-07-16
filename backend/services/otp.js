const Client = require("authy-client").Client;
const authy = new Client({ key: process.env.AUTHY });


// Register New User
// details: {countryCode , email , phone}
exports.registerNewUser= async (details)=>{
    return authy.registerUser(details)
}
// Send OTP
exports.sendOTP=(authyId)=>{
    return authy.requestSms({authyId :authyId} , {force : true})
}
// Verify OTP
exports.verifyOTP=(authyId,token)=>{
    return authy.verifyToken({authyId: authyId, token: token})
}