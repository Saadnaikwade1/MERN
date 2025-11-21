const express = require('express');
const {home,add,about,reg} = require('../controllers/ct');
let rt=new express.Router()

rt.get("/",home)
rt.get("/reg",reg)
rt.get("/about",about )
rt.post("/add",add)

module.exports=rt