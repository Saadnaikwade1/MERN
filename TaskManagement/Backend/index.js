const express = require('express'); 
const mongoose = require('mongoose');
const rt = require('./routes/empRoute');
const cors=require('cors');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
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