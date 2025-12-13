const express = require('express');
const {add,login, sendOtp, validateOtp, updatePassword,getemp} = require('../controllers/empCon');
const {addTask,empDisplay,adminDisplay, updateStatus} = require('../controllers/taskCon');


let rt=new express.Router()
rt.post("/add",add)
rt.post("/login",login)
rt.get("/sendopt/:id",sendOtp)
rt.get("/votp/:id/:otp",validateOtp)
rt.put("/updpass",updatePassword)
rt.post("/addtask",addTask)
rt.get("/disp/:eid",empDisplay)
rt.get("/disp",adminDisplay)
rt.post("/getemp/:dept",getemp)
rt.get("/updstatus/:tid/:st",updateStatus)
module.exports=rt   