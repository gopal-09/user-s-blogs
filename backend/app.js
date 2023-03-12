const express=require('express')
const mongoose=require('mongoose')
const blogRouter=require('./routes/blog-routes')
const router= require('./routes/user-routes')
const app= express()


app.use(express.json())

app.use('/api/user', router)
app.use('/api/blog', blogRouter)
// app.use('/api',(req,res)=>{
// res.send('Welcome')
// })
mongoose.connect('mongodb://0.0.0.0:27017/blog', { useNewUrlParser: true }, (err) => {
    mongoose.set('strictQuery', true);
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
app.listen(3000,(req,res)=>{console.log('listening on')})
