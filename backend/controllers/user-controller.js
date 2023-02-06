const { response } = require('express')
const User=require('../models/user')
 const bcrypt =  require('bcryptjs')
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
     let existingUser;
     try {
         existingUser = await User.findOne({email}) 
         }
         catch (error) {
             console.log(error);
         } 
         if(existingUser) {
              response.json({message:'user exist'})  
         }
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
          return res.status(200).json({user: user})
 
}
const login= async (req, res) => {
    
        const{email,password}=req.body;
        let user;
        try {
            user = await User.findOne({email})
        }
        catch (error) {
            console.log(error);
        }
        if(!user) {
           return res.json({message: "User not found"})
        }
        const isPasswordCorrect=bcrypt.compareSync(password, user.password)
        if(!isPasswordCorrect)
        {
                return res.status(200).json({message:"Incorrect password"})
        }
        return res.status(200).json({message:"login success"})
}

module.exports = {getAllUser,signup,login};