const express=require('express');
const auth=require('../middleware/auth');
const {getAllBlogs,addBlog,updateBlog,getById,deleteBlog,getBlogsbyUserID}=require('../controllers/blog-controller');
//const router = require('./routes/blog-routes');
const blogRouter = express.Router()
blogRouter.get('/',getAllBlogs)
blogRouter.post('/add',auth,addBlog)
blogRouter.put('/update/:id',updateBlog)
blogRouter.get('/:id',getById)
blogRouter.delete('/:id',deleteBlog)
blogRouter.get('/user/:id',getBlogsbyUserID)

module.exports=blogRouter
//module.exports ={router}