const mongoose = require('mongoose');
let psch=mongoose.Schema({
    "_id":String,
    "name":String,
    "age":Number,
    "phno":String,
    "email":String,
    "gender":String,
    "weight":Number,
    "height":Number,
    "temp":Number,
    "bp":String,
    "recomendation":String,
    "comm":String,
    "med":[],
    "dept":String,
    "consultent":String,

    
})

let pm=mongoose.model("pm",psch)
module.exports=pm
