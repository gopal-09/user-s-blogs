const { default: mongoose } = require('mongoose');
// const blog = require('../models/blog');
const Blog=require('../models/blog');
const user = require('../models/user');
//const ObjectId=mongoose.Types.ObjectId;

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
    else{
    res.status(200).json({blogs});}
}
const addBlog=async(req,res)=>{
    const{title,description,user}=req.body;
    let existingUser;
    try{
        existingUser=await User.findById(user);
        //console.log("d")
    }
    catch(err){
        console.log(err)
    }
    if(!existingUser){
        res.status(404).json({message:'No users found'});
    }
    else{
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
       
}
const updateBlog= async (req,res)=>{
    const blogId=req.params.id;
    let blog;
    try{
    blog= await Blog.findByIdAndUpdate(blogId,{
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
        res.json({message:"blog not found"})
    }
    else{
    return res.json({blog})}
}
const getById= async (req,res)=>
{
    const id=req.params.id;
    let blog
    try{
      blog=await Blog.find(id)
    }
    catch(err){
        return console.log(err);
    }
    if(!blog)
    {
       res.status(404).json({message:"no blog found"}) 
    }
    else{
    res.json({blog})}
}
const deleteBlog=async(req,res)=>{
    const id=req.params.id
   // let blog;
    let blog=await Blog.findById(id)
    //console.log(blog)
    // if(!blog)
    // return res.json({message:"no blog found"})
    
    try{
       //let k= blog.user.blogs.indexOf(id)
        await user.updateOne(
            { $pull: { blogs: { $in: [ id ] } } }
           
        )
        // await blog.user.save()
        await Blog.findByIdAndDelete(id)
    }
    catch(err){
        console.log(err)

    }
    if(!blog){
        res.json({message:"deleted successfully"})
    
}
    // else{
    // res.json({message:""})
    // }

}

const getBlogsbyUserID=async (req,res)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await user.findById(userId)
        // userBlogs=await Blog.find(ObjectId(userId))
    }
    catch(err){
        return console.error(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:'No blogs found'});
    }
    else{
    res.status(200).json(userBlogs.blogs);}
}
module.exports = {getAllBlogs,addBlog,updateBlog,getById,deleteBlog,getBlogsbyUserID}