const { response } = require('express')
const User=require('../models/user')
const JWT = require("jsonwebtoken")
//const image=require('../models/image')
 const bcrypt =  require('bcryptjs')
 const { check, validationResult } = require("express-validator");
 const multer= require('multer')
 const getAllUser = async (req, res, next) => {
    let users;
    try {
        
        users = await User.find();}
catch (error) {
        console.log(error);}
        res.status(200).json({users});
}
 const signup= async (req,res,next) => {
    const{name,email,password}=req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    res.send("validation error: " + errors)
    else{
     let existingUser;
     try {
         existingUser = await User.findOne({name}) 
         }
         catch (error) {
             console.log(error);
         } 
         if(existingUser) {
            //console.log(existingUser)
              res.json({message:'user exist'})  
         }
         else{
         const hashedPassword=bcrypt.hashSync(password)
         const user=new User({
                name,
                email,
                password:hashedPassword,
                blogs:[]
         }) ;
         
         try {
             await user.save();
         }
         catch (error) {
             console.log(error);
         }
         const token =JWT.sign({email}, "nfb32iur32ibfqfvi3vf932bg932g", {expiresIn: 360000});
         console.log(token);
          return res.status(200).json({user: user})
        }
    }
}

    
    login= async (req, res) => {
    const{email,password}=req.body;
        let user;
        try {
            user = await User.findOne({email})
            //let isMatch = await bcrypt.compare(req.body.password,user.password);
        }
        catch (error) {
            console.log(error);
        }
        if(!user) {
           return res.json({message: "User not found"})
        }
        else{
        const isPasswordCorrect=bcrypt.compareSync(password, user.password)
        if(!isPasswordCorrect)
        {
                return res.status(200).json({message:"Incorrect password"})
        }
        else{
            const token =JWT.sign({email}, "nfb32iur32ibfqfvi3vf932bg932g", {expiresIn: 360000});
            console.log(token);
        return res.status(200).json({message:"login success"})}
    }
}


module.exports = {getAllUser,signup,login}