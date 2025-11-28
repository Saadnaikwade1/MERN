let express=require('express');
const {add,reg, disp, edit, upd,del,home,sort, getsearch,search} = require('../controllers/resCon');
let rt=new express.Router()
 
rt.get("/",home)
rt.post("/add",add)
rt.get("/reg",reg)
rt.get("/disp",disp)
rt.get("/edit/:id",edit)
rt.post("/upd",upd)
rt.get("/del/:id",del)
rt.get("/sort/:col",sort)
rt.get("/spage",getsearch)
rt.get("/search",search)
 
module.exports=rt 