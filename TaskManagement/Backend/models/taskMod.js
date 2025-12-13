const mongoose = require('mongoose');
let taskScheema=new mongoose.Schema({
    "_id":String,
    "title":String,
    "desc":String,
    "dept":String,
    "status":{
        type:String,
        default:'created'

    },
    "eid":String,
})

let tm=mongoose.model("task",taskScheema)

module.exports=tm 