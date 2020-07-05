const mongoose = require("mongoose");

const MaharajSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        unique:true,
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    mobile:{
        type:String,
        unique:true,
        required:[true,"Plase add your number"]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
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
    authyId:String,
    isVerified:{
        type:Boolean,
        default:false
    },
    cooking:{
        cuisine : String,
        yearsOfExp: Number
    },
    signalId:String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Order"
    }]

}, {timestamps:true})

module.exports = mongoose.model("Maharaj" , MaharajSchema)