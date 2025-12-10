const express = require('express');
const {add,login, sendOtp, validateOtp, updatePassword} = require('../controllers/empCon');


let rt=new express.Router()
rt.post("/add",add)
rt.post("/login",login)
rt.get("/sendopt/:id",sendOtp)
rt.get("/votp/:id/:otp",validateOtp)
rt.put("/updpass",updatePassword)

module.exports=rt