const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const app=express();
mongoUrl="mongodb://127.0.0.1:27017/seriesData";
mongoose.set('strictQuery', true);
mongoose.connect(mongoUrl,).then
(()=>console.log("database connected successfully")).catch
((err)=>console.log(err));

const seriesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:Number,
})

const Serie=new mongoose.model('Series',seriesSchema);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'/public')));
app.get('/',async (req,res)=>
{
    res.render('index',{title:"title"});
    
})
app.get("/search", async(req,res)=>{

    const {q} =  req.query;

       const series = await Serie.find({ name: { $regex : `^${q}`}});
      
       res.status(200).json(series);

})
app.post('/',(req,res)=>
{
    res.send("post is working");
})

app.get('/search',(req,res)=>
{

})




app.listen(5000,()=> console.log("server is listen at port 5000"));