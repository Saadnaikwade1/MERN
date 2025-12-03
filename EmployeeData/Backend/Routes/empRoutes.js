const express = require('express');
const { disp, add ,del, edit, upd} = require('../Controllers/EmpCon');

let rt=new express.Router()

rt.post("/add",add)
rt.get("/disp",disp)
rt.get('/edit/:id',edit)
rt.put("/upd/:id",upd)
rt.delete("/emp/:id",del)

module.exports=rt