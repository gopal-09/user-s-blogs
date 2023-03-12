const { response } = require('express')
const User=require('../models/user')
const image=require('../models/image')
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
              res.json({message:'user exist'})  
         }
         else{
         const hashedPassword=bcrypt.hashSync(password)
         const user=new User({
                name,
                email,
                // image:{
                //   data:req.file.filename,
                //    contentType:'image/png'
                // },
                password:hashedPassword,
                blogs:[]
         }) ;
         
         try {
             await user.save();
         }
         catch (error) {
             console.log(error);
         }
          return res.status(200).json({user: user})
        }
    }
}
//storage
// const Storage = multer.diskStorage({
//         destination:"uploads",
//         filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//         },
//         })
//         const upload=multer({
//             storage:Storage
//         }).single('testImage')
// const upimage=async(req,res)=>{
//     upload(req,res,(err)=>{
//         if(err){
//             console.log(err);
//         }
//         const newImage=new image({
//            name:req.body.name,
//            image:{
//             data:req.file.filename,
//             contentType:'image/png'
//            } 
//         })
//         newImage.save()
//         .then(()=>res.send("uploaded successfully")).catch(err=>res.send(err))
//     )}
    
        
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
        return res.status(200).json({message:"login success"})
    }
}


module.exports = {getAllUser,signup,login}