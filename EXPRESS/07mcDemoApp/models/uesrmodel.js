const mongoose = require('mongoose');
let userSheema=mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "place":String,
})

let um=mongoose.model("users",userSheema)

module.exports=um