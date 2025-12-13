const { v4: uuid } = require("uuid");
const tm=require('../models/taskMod');
let addTask=async(req,res)=>{
    try {
        let data=new tm({...req.body,"_id":uuid()})
        await data.save()
        res.json({"msg":"Data Stored"})
    } catch{
        res.json({"msg":"Error in adding tasks"})
    }
}
let adminDisplay=async(req,res)=>{
    try{
        let data= await tm.find()
        res.json(data)
    }catch{
        res.json({"msg":"Error in fetching tasks"})
    }
}
let empDisplay=async(req,res)=>{
    try{
        let data= await tm.find({"eid":req.params.eid})
        res.json(data)

    }catch{
        res.json({"msg":'Error in fetching tasks'})
    }
}

let updateStatus=async(req,res)=>{
    try {
        await tm.findByIdAndUpdate({"_id":req.params.tid},{"status":req.params.st})
        res.json({"msg":"task status changed"})
    } catch{
        res.json({"msg":"Error in updating task"})
    }
}
module.exports={addTask,adminDisplay,empDisplay,updateStatus}