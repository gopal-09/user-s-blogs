const { default: mongoose } = require('mongoose');
// const blog = require('../models/blog');
const Blog=require('../models/blog');
//const user = require('../models/user');
const ObjectId=mongoose.Types.ObjectId;

const User=require('../models/user')
const getAllBlogs=async(req,res)=>{
    let blogs;
    try{
        blogs=await Blog.find();
    }catch(err){
        return console.error(err);
    }
    if(!blogs){
        return res.status(404).json({message:'No blogs found'});
    }
    res.status(200).json({blogs});
}
const addBlog=async(req,res)=>{
    const{title,description,user}=req.body;
    let existingUser;
    try{
        existingUser=await User.findById(user);
        console.log("d")
    }
    catch(err){
        console.log(err)
    }
    if(!existingUser){
        res.status(404).json({message:'No users found'});
    }
    const blog= await Blog.create({title:req.body.title
        ,description:req.body.description,
        user:req.body.user});

    existingUser.blogs.push(blog._id);
    await existingUser.save();
    res.send({
        message: 'Blog created successfully',
        blog: blog
    })
       
}
const updateBlog= async (req,res)=>{
    const blogId=req.params.id;
    try{
    const blog= await Blog.findByIdUpdate(blogId,{
        title:req.body.title,
        description:req.body.description,
    })
    }
    
    catch(err)
    {
        console.log(err);
    }
    if(!blog)
    {
        res.json({message:"update blog"})
    }
    return res.json({blog})
}
const getById= async (req,res)=>
{
    const id=req.params.id;
    let blog
    try{
      blog=await Blog.find(id)
    }
    catch{
        return console.log(err);
    }
    if(!blog)
    {
       res.status(404).json({message:"no blog found"}) 
    }
    res.json({blog})
}
const deleteBlog=async(req,res)=>{
    const id=req.params.id
    let blog;
    try{
        blog =await Blog.findByIdAndRemove(id).populate('User')
        await blog.user.blogs.pull(blog._id)
        await blog.user.save()
    }
    catch(err){
        consolelog(err)

    }
    if(!blog){
        res.json({message:"no blog found"})
    }
    res.json({message:"delete successfully"})

}
const getByUserId=async (req,res)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.find(userId).populate("Blog")
    }
    catch(err){
        return console.error(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:'No blogs found'});
    }
    res.status(200).json({userBlogs});
}
const getBlogsbyUserID=async (req,res)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await Blog.find({user:userId})
        // userBlogs=await Blog.find(ObjectId(userId))
    }
    catch(err){
        return console.error(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:'No blogs found'});
    }
    res.status(200).json({userBlogs});
}
module.exports = {getAllBlogs,addBlog,updateBlog,getById,deleteBlog,getByUserId,getBlogsbyUserID}