let {v4:uuidv4}=require("uuid")
const  pm= require('../models/pm');
let add=async(req,res)=>{
    try{
        let data=new pm({...req.body,"_id":uuidv4()})
        await data.save()
        res.json({"msg":"record added"})

    }
    catch{
        res.json({"msg":"error in adding record"})
    }
}

let getdet=async(req,res)=>{
    try {
        let data=await pm.find({[req.params.fn]:req.params.value})
        res.json(data)
    } catch(err) {
        res.json({"msg":`${err}`})
        
    }
}

let upd=async(req,res)=>{
    try {
        await pm.findByIdAndUpdate(
            {"_id":req.body._id},
            {"comm":req.body.comm,
            "recomendation":req.body.rc,"med":req.body.med}
        )
        res.json({"msg":"updated report"})
    } catch {
        res.json({"msg":"error in updating record"})
    }
}

let getall=async(req,res)=>{
    try{let data=await pm.find()
    res.json(data)}
    catch{
        res.json({"msg":"error in getting data"})
    }
}
module.exports={add,getdet,upd,getall}