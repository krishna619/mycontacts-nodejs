const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()
const User = require('../models/userModel');
const registerUser = asyncHandler(async(req, res) =>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");

    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already registered");
    }
    const hashedpassword = await bcrypt.hash(password,10);
    console.log("hashedpassword",hashedpassword);
    const user = await User.create({
        username,
        email,
        password: hashedpassword,
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id: user.id,email: user.email});
    }else{
        res.status(400);
        throw new Error("User data not valid");
    }
    res.json({message: 'Register the user'});
});
const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken  = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,

            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "12m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is incorrect");
    }

    
});
const currentUser = asyncHandler(async(req, res) =>{
    res.json({message: 'Info of the user'});
});
module.exports={
    registerUser,loginUser,currentUser
};