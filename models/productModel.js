const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
    user: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    productName: {
        type: String,
        unique: true,
        required: true,
        },
    productPrice: {
        type: Number,
        required: true,},
},{timestamps: true});

const Product = mongoose.model("product", productModel);

module.exports = Product;