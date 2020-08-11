const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const MaharajSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile:{
        type:String,
        unique:true,
        required:[true,"Plase add your number"]
    },
    password: {
        type: String,
        minlength: 4,
        select: false
    },
    registeredAddress:{
        address : String,
        city : String,
        zipcode : String
    },
    profileImage:{
        contentType:String,
        imageData:Buffer
    },
    document:{
        name:String,
        imageData : Buffer , 
        contentType : String
    },
    kin:{
        type:Number
    },
    role: {
        type: String,
        enum: ['maharaj',"admin"],
        default: 'maharaj'
    },
    authyId:String,
    isVerified:{
        type:Boolean,
        default:false
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    basePrice:{
        amount:{
            type:Number
        },
        per:{
            type:String,
            enum:["hour","day","month","meals","people"],
            default:"hour"
        }
    },
    cooking:{
        cuisine : [String],
        yearsOfExp: Number
    },
    signalId:String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Request"
    }]

}, {timestamps:true})

MaharajSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
// Encrypt password using bcrypt
MaharajSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// //Sign JWT token and return when a user logs in (this is a method and not static, we did this to keep our controller methods clean)
// MaharajSchema.methods.getSignedJwtToken = function() {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// };

// Match user entered password to hashed password in database
MaharajSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Get only public profile
MaharajSchema.methods.getPublicProfile = function(){
    const maharajObj=this;
    const maharaj = maharajObj.toObject()
    const maharajImageURL = `/api/v1/maharajAuth/${maharaj._id}/profileimage`;
    const maharajDocURL = `/api/v1/maharajAuth/${maharaj._id}/doc`;
    maharaj.imageURL=maharajImageURL;
    maharaj.docURL=maharajDocURL;
    delete maharaj.profileImage;
    delete maharaj.document;
    delete maharaj.password;
    return maharaj;
}


module.exports = mongoose.model("Maharaj" , MaharajSchema);