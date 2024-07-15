const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");


exports.addProduct = catchAsyncErrors(async (req, res, next) => {
    const {productName, productPrice} = req.body;
    const userId = req.id;
    
    const newProduct = new Product({
        user: userId,
        productName: productName,
        productPrice: productPrice,
    });

    await newProduct.save();

    res.json({message: "product added successfully", product: newProduct});
});

exports.allProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    if(!products || products.length === 0){
        return res.status(404).json({message: "No Product Found"});
    }
    res.json({message: "List of all products", products: products});
})