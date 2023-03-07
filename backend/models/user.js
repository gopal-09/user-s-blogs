const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const SchemaTypes=mongoose;
const ObjectId=mongoose.Schema.Types.ObjectId;
const userSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  // image:{
  //   data:Buffer,
  //   contentType:String
 // },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  blogs: [{type:SchemaTypes.ObjectId,ref:"blog",required:true}],
})
module.exports= mongoose.model('User',userSchema);