const express = require('express');
const {addUser,login} = require('../controllers/usercon');

let router=new express.Router()
router.post("/login",login)
router.post("/reg",addUser)

module.exports=router