const express = require('express');
const mongoose = require('mongoose');

let epmsch=mongoose.Schema({
    "_id":Number,
    "name":String,
    "email":String,
    "phno":String,
    "gen":String,
    "sal":Number,
    "dept":String,
})

let rm=mongoose.model("emp",epmsch)
mongoose.connect("mongodb://localhost:27017/empdatadb").
then(()=>{
    console.log("Database connection done successfully 🚀");
}).catch(()=>{
    console.log("Error in database connection ⚠️");
})

let app=express()
app.use(express.json())

app.post("/add",(req,res)=>{
    let data=new rm(req.body)
    data.save().then((data) => {
        res.json("data stored")
    }).catch(() => {
        res.json("Error in storing data")
    }); 

})

app.get("/",(req,res)=>{
    rm.find().then((data) => {
        res.json(data)
    }).catch(() => {
        res.json("Error in fecthing data")
    });
})

app.get("/search/:id",(req,res)=>{

    const id=req.params.id

    if(!id){
        console.log("id not provided");
        return res.json({msg:"ID not provided⚠️"})
    }

    rm.findById(req.params.id)
    .then((data) => {
        if(!data){
            return res.json({msg:"No record found for this ID"})
        }
        res.json(data)
    }).catch(() => {
        res.json({msg:"Error in sending data"})
    });
})

app.listen(5000,()=>{
    console.log("server running on port 5000 🚀");
})