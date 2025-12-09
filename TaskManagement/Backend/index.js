const express = require('express'); 
const mongoose = require('mongoose');
const rt = require('./routes/taskRoute');
const cors=require('cors');

mongoose.connect("mongodb+srv://saad:saad123@cluster0.tbofwtl.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log('data ok');
}).catch((err)=>{
    console.log(`Error:${err}`);
})
 
let app=express()
app.use(express.json())
app.use(cors())
app.use("/",rt)
app.listen(5000,()=>{
    console.log("http://localhost:5000");
    
})