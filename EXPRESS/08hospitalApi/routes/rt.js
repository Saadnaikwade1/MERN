const express = require('express');
const {add,getdet,upd,getall}=require('../controller/pcon');

let rt=new express.Router()
rt.post("/add",add)
rt.get("/getdet/:fn/:value",getdet)
rt.put("/upd",upd)
rt.get("/getall",getall)
module.exports=rt
