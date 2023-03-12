const express=require('express')
const {getAllUser, signup,login,upimage}= require('../controllers/user-controller')
const { check, validationResult } = require("express-validator");
const router=express.Router()
router.get('/',getAllUser);
router.post('/signup',[
    check("email", "Please input a valid email")
        .isEmail(),
    check("password", "Please input a password with a min length of 6")
        .isLength({min: 6})
],signup)
router.post('/login',login)
//router.post('/upimage',upimage);
module.exports=router;