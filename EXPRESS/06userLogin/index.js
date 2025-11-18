const express = require('express'); 
const mongoose = require('mongoose');

let userScheema= new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "phno":Number,
    "date":Date,

    
})

let user=mongoose.model("user",userScheema)
mongoose.connect("mongodb://localhost:27017/userdb").then(() => {
    console.log("connection ok");
    
}).catch(() => {
 console.log("Error in connection");   
});

let app=express()
app.listen(5000)
app.use(express.json())

app.post("/reg",async(req,res)=>{
    try{
        let obj=await user.findById(req.body._id)
        if(obj){
            res.json({"msg":"Account exist with given email"})
        }else{
            let data= user(req.body)
            await data.save()
            res.json({"msg":"Account created"})

        }
    }
    catch{
        res.json({"msg":"Error in reg"})
    }
})

app.get("/login",async(req,res)=>{
    try {
        let arr=await user.find(req.body)
        if(arr.length>0){
            res.json({"msg":"login success ✅"})
        }
        else{
            res.json({"msg":"Check email or pwd⚠️"})
        }
    } catch {
        res.json({"msg":"error in login"})
    }
})