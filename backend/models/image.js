const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const imageSchema=new Schema({
    user:{
        type:String,
        required:true,
      },
      image:{
        data:Buffer,
         contentType:String
       }, 
})
module.exports= mongoose.model('image',imageSchema);
