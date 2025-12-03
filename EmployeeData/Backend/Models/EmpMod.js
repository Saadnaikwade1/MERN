const mongoose = require('mongoose');

let empScheema=mongoose.Schema({
    "_id":String,
    "name":String,
    "email":String,
    "gen":String,
    "phno":Number,
    "sal":Number,
    "dept":String,
})

let emp=mongoose.model("emp",empScheema)

module.exports=emp