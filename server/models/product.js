const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    discount: { type: Number, require: true },
    category: { type: String, require: true },
    thumbnail: { type: String, reqire: true },
    ratings: { type: Number, require: true, },
    createdAt: { type: Date, require: Date.now(),
     }
});
const productModel = new mongoose.model("products", productSchema);
module.exports = {
    productModel,
}