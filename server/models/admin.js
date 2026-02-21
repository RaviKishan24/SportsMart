const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: Number, required: false },
    otpAdmin:{type:Number,required:false},
    otpExpiration: { type: Date, required: false },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: () => Date.now() },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'other'], required: true },
    profilePic: { type: String, required: false },
    role: { type: String, default: 'admin' },
    users:{
        type:[{

        }],default:[]
    },
});

const Admin = new mongoose.model("Admin", adminSchema)

module.exports = {Admin}