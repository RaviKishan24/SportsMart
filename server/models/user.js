const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: Number, required: false },
    otpExpiration: { type: Date, required: false },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'other'], required: true },
    profilePic: { type: String, required: false },
    role: { type: String, default: 'user' },
    cart: {
        type: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            title: { type: String, required: true },
            category: { type: String, required: true },
            thumbnail: { type: String, required: true },
            quantity: { type: Number, default: 1, min: 1 },
            price: { type: Number, required: true },
            discount: { type: Number, required: true },
            addedAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now }
        }], default: []
    },
    wishlist: {
        type: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            title: { type: String, required: true },
            category: { type: String, required: true },
            thumbnail: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1, min: 1 },
            price: { type: Number, required: true },
            discount: { type: Number, required: true },
            addedAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now }


        }], default: []
    },
    address: {
        type: [{
            name: { type: String, required: true },
            mobile: { type: Number, required: true },
            email: { type: String, required: true },
            house: { type: String, required: true },
            landmark: { type: String, required: false },
            pincode: { type: Number, required: true }

        }], default: []
    },
    orders: {
        type: [{
            orderId: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Unique order ID
            products: [{
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
                title: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true },
                discount: { type: Number, required: true }
            }],
            totalAmount:{type:Number,required:true},
            orderDate:{type:Date,default:Date.now()},
            status:{type:String,enum:['Pending', 'Shipped', 'Delivered', 'Cancelled'],default:'Pending'}
        }],
        default:[]
    }

});
const User = new mongoose.model("user", userSchema);

module.exports = {
    User,
}