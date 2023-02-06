const mongoose = require('mongoose')
const Schema =mongoose.Schema;
const SchemaTypes=mongoose;
//const ObjectId=mongoose.Schema.Types.ObjectId;
const blogSchema=new Schema(
    {
      title:{
        type:String,
        required:true
      },
      description:{
        type:String,
        required:true
      },
      image:{
          type:String,
          required:true
      },
      user:{
        // type:SchemaTypes.ObjectId,
        // ref:"User",
        type:String,
        required:true,

      }
        
    }
)
module.exports=mongoose.model('blog',blogSchema)