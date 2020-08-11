const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
    
        type: String
    },
    role: {
        type: String,
        enum: ['user',"admin"],
        default: 'user'
    },
    mobile:{
        type:String,
        unique:true,
        required:[true,"Plase add your number"]
    },
    city:{
        type:String
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 4,
        select: false
    },
    profileImage:{
        contentType:String,
        imageData:Buffer
    },
    authyId:String,
    isVerified:{
        type:Boolean,
        default:false
    },
    signalId:String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Request"
    }]
    
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT token and return when a user logs in (this is a method and not static, we did this to keep our controller methods clean)
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Get only public profile
UserSchema.methods.getPublicProfile = function(){
    const userObj=this;
    const user = userObj.toObject()
    const userImageURL = `/api/v1/auth/${user._id}/profileimage`;
    user.imageURL=userImageURL;
    delete user.profileImage;
    delete user.password;
    return user;
}

module.exports = mongoose.model("User",UserSchema);