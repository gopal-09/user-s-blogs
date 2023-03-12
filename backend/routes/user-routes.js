const express=require('express')
const {getAllUser, signup,login,upimage}= require('../controllers/user-controller')
// const signup = require('../controllers/user-controller')
const router=express.Router()
router.get('/',getAllUser);
router.post('/signup',signup)
router.post('/login',login)
//router.post('/upimage',upimage);
module.exports=router;