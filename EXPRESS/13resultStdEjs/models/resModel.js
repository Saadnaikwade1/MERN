const mongoose = require('mongoose');
let resultScheema=mongoose.Schema({
    "_id":String,
    "name":String, 
    "age":String,
    "gender":String,
    "phno":Number,
    "marks":Number,

})

let rm=mongoose.model('result',resultScheema)
module.exports=rm