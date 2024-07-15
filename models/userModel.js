const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required."],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill the valid email address.",
        ],
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed more than 15 characters"],
        minLength: [8, "Password should have atleast 8 characters"],
        // match: [
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
        //     "Please fill valid password."
        // ]
    },
    product:[
        {type: mongoose.Schema.Types.ObjectId, ref: "product"}
    ],

}, {timestamps: true});

userModel.pre("save", function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

userModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

// token 
userModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const User = mongoose.model("user", userModel);

module.exports = User;