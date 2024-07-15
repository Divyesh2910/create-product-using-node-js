const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/sendtoken");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({message: "homepage"});        
});

exports.usersignup = catchAsyncErrors(async (req, res, next) => {
    const user = await new User(req.body).save();
    sendtoken(user, 201, res);          
});

exports.usersignin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email}).select("+password").exec();

    if(!user) return next(new ErrorHandler("User not found with this email.", 404));

    const isMatch = user.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("wrong password credentials", 500))
    sendtoken(user, 200, res);
});

exports.usersignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({message: "Successfully signout!"});        
});